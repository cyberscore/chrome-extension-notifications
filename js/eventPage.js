var api_root = "http://api.dev/users/"


// HELPERS


function encodeBase64(username, password) {
  return btoa(username+':'+password);
}

function urlForUserNotifications(username) {
  return api_root + username + "/notifications"
}


// CORE


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
}

function refreshBadge() {
  function displayUnreadCount(count) {
    chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0,0, 255] })
    chrome.browserAction.setBadgeText({ text: String(count) })
  }
  function displayTotalCount(count) {
    chrome.browserAction.setBadgeBackgroundColor({ color: [200, 200,200, 255] })
    chrome.browserAction.setBadgeText({ text: String(count) })
  }

  chrome.storage.local.get('notifications', function (data) {
    var counts = _.countBy(_.flatten(_.values(data.notifications)), 'unread');
        counts.true = counts.true || 0;

    if (counts.true > 0) {
      displayUnreadCount(counts.true);
    } else {
      displayTotalCount(counts.true + counts.false)
    }
  })
}
function refreshPopup() {
  var popup = chrome.extension.getViews({ type: 'popup' })[0]

  if (popup == undefined) return;

  popup.displayNotifications();
}


function callCyberscoreAPI() {
  console.log("=>", "callCyberscoreAPI")

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
      }
    }
    console.log("xhr", xhr.send())
  })
}

function refreshUI() {
  refreshBadge();
}

function refreshNotifications() {
  refreshUI();
  callCyberscoreAPI();
}


// HOOKS


chrome.runtime.onInstalled.addListener(function () {
  refreshNotifications();
  chrome.alarms.create("refresh", { periodInMinutes: 5 });
})

chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (namespace == "sync") return;

  refreshUI();

  console.log("onChanged", changes)
})

chrome.alarms.onAlarm.addListener(function (alarm) {
  console.log("onAlarm")
  refreshNotifications();
})
