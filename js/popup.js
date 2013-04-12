Handlebars.partials = Handlebars.templates;
Handlebars.registerHelper('formatDate', function (date) {
  return moment(date).format('DD MMM')
})
Handlebars.registerHelper('type', function (type) {
  return type[0].type;
})
Handlebars.registerHelper('fullType', function (type) {
  var types = { ygb: 'You Got Beat'
              , proof_refused: 'Proof Refused'
              , rec_approved: 'Record approved'
              };

  return types[type[0].type];
})
Handlebars.registerHelper('isUnread', function (status) {
  return (status ? 'unread' : 'read');
})

function checkForCredentials() {
  chrome.storage.sync.get("username", function (data) {
    if (data.username == undefined || data.username == "")
      openOptionsPage();

    displayNotifications();
  })
}

function openOptionsPage() {
  console.log("credentials not found.");

  chrome.storage.local.clear();
  chrome.tabs.create({ url: 'options.html' })
}

function reloadPopup() {
  window.location.reload();
}

function displayNotifications() {
  chrome.storage.sync.get('username',function (data) {
    var username = data.username;

    chrome.storage.local.get('notifications', function (data) {
      var total = _.compose(String,_.size,_.flatten,_.values)(data.notifications)



      var renderedTemplate = Handlebars.templates.layout({
        username:      username
      , notifications: data.notifications
      , total:         total
      })

      // debugger;
      //
      document.body.innerHTML = renderedTemplate;

      addClickListeners();

    })
  })
}

function retrieveNotification(checkbox, callback) {
  chrome.storage.local.get('notifications', function (data) {
    var type = checkbox.getAttribute('data-notification-type');
    var href = checkbox.getAttribute('data-notification-url');

    var notifications = data['notifications'][type];

    var notification = _(notifications).find(function (elem) { return elem['url'] == href; });
  })
}

function retrieveNotificationURL(checkbox) {
  return checkbox.getAttribute('data-notification-url')
}

function selectedNotifications() {
  var urls = [];
  var nots = [];

  [].forEach.call(document.querySelectorAll('tbody input:checked'), function (checkbox) {
    urls.push(retrieveNotificationURL(checkbox))
  })

  return urls;
}


function markAsRead() {
  console.log("markAsRead");
  notifications = selectedNotifications();

  notifications.forEach(function (notification) {
    chrome.runtime.getBackgroundPage(function (eventPage) {
      eventPage.updateNotificationStatus(notification, false)
    })
  })
}
function markAsUnread() {
  console.log("markAsUnread");
  notifications = selectedNotifications();

  notifications.forEach(function (notification) {
    chrome.runtime.getBackgroundPage(function (eventPage) {
      eventPage.updateNotificationStatus(notification, true)
    })
  })
}
function deleteNotification() {
  console.log("deleteNotification");
  notifications = selectedNotifications();

  notifications.forEach(function (notification) {
    chrome.runtime.getBackgroundPage(function (eventPage) {
      eventPage.deleteNotification(notification);
    })
  })
}


function addToolbarListeners() {
  [].forEach.call(document.querySelectorAll('.option.mark-read'), function (option) {
    console.log("opt", option)
    option.addEventListener('click', markAsRead);
  });

  [].forEach.call(document.querySelectorAll('.option.mark-unread'), function (option) {
    console.log("opt", option)
    option.addEventListener('click', markAsUnread);
  });

  [].forEach.call(document.querySelectorAll('.option.delete'), function (option) {
    console.log("opt", option)
    option.addEventListener('click', deleteNotification);
  });
}

function addHeaderListeners() {
  [].forEach.call(document.querySelectorAll('thead input'), function (e) {
    e.addEventListener('click', function (click) {
      var global = this;
      var type = this.getAttribute('data-notification-type');

      [].forEach.call(document.querySelectorAll('#' + type + ' tbody input[type=checkbox]'), function (checkbox) {
        checkbox.checked = global.checked;
      })

    })
  })
}

function addClickListeners() {
  addToolbarListeners();
  addHeaderListeners();

  document.querySelector('.close').addEventListener('click', dismissAlert);
  document.querySelector('.reload').addEventListener('click', reloadPopup);
}

//
// ALERT BAR
//
function showAlert () {
  var alert = document.querySelector('.refresh-alert');

  alert.style.display = "block";
}
function dismissAlert () {
  document.querySelector('.refresh-alert').style.display = "none";
}

//
// HOOKS
//
document.addEventListener('DOMContentLoaded', function () {
  checkForCredentials();
});
