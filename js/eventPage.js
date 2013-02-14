var api_root = "http://api.dev/users/"

function encodeBase64(username, password) {
  return btoa(username+':'+password);
}

function urlForUserNotifications(username) {
  return api_root + username + "/notifications"
}

function processNotifications(notifications) {
  var result = _.map(notifications, function (elem) {
    var notification = {
      type:      elem['type']
    , unread:    elem['unread']
    , timestamp: Date.parse(elem['timestamp'])
    , game:      { name: elem['game']
                 , link: elem['_links']['cs:game']['href'] }
    , chart:     { name: elem['chart']
                 , link: elem['_links']['cs:chart']['href'] }
    }

    return notification;
  })

  return result;
}

function storeNotifications (notifications) {
  console.log("=>", "storeNotifications")


  var grouped_by_type = _.groupBy(notifications, 'type')
  chrome.storage.local.set({ 'notifications': grouped_by_type }, function (data) {
    console.log("stored", data)
  })

  localStorage.setItem('notifications', JSON.stringify(notifications))
}

function updateBadge(counter, isUnread) {
  console.log("=>", "updateBadge")

  var unreadString = String(counter)

  if (isUnread) {
    console.log("=>", "unread")
    chrome.browserAction.setBadgeBackgroundColor({ color: [255,0,0,255] })
    chrome.browserAction.setBadgeText({ text: unreadString })
    return;
  }

  chrome.browserAction.setBadgeBackgroundColor({ color: [200,200,200,255] })
  chrome.browserAction.setBadgeText({ text: unreadString })
}

function fetchNotifications() {
  console.log("=>", "fetchNotifications")

  chrome.storage.sync.get(['username','password'], function (data) {
    var username   = data.username;
    var password   = data.password;
    var api_string = urlForUserNotifications(username);

    if (username == "") { console.log("Username not found"); return; }
    if (password == "") { console.log("Password not found"); return; }

    xhr = new XMLHttpRequest();
    xhr.open("GET", api_string, true, username, password);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        var notifications = JSON.parse(xhr.response)['_embedded']['notifications'];

        notifications = processNotifications(notifications);
        storeNotifications(notifications);
        updateBadge(notifications.length);
      }
    }
    xhr.send();
  })
}

function updateNotifications() {
  var notifications = JSON.parse(localStorage.getItem('notifications'));

  if (notifications) {
    updateBadge(notifications.length);
  }

  fetchNotifications();
}


chrome.runtime.onInstalled.addListener(function () {
  updateNotifications();
  chrome.alarms.create("refresh", { periodInMinutes: 5 });
});

chrome.alarms.onAlarm.addListener(function (alarm) {
  console.log("listener", "onAlarm")
  fetchNotifications();
})
