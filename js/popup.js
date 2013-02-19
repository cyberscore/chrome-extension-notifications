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
  chrome.storage.sync.get(function (data) {
    if (data.username == undefined || data.username == "")
      openOptionsPage();

    displayNotifications();
  })
}

function openOptionsPage() {
  console.warn("credentials not found.");
  window.close();
  chrome.storage.local.clear();
  chrome.tabs.create({ url: 'options.html' })
}

function displayNotifications() {
  chrome.storage.sync.get('username',function (data) {
    var username = data.username;

    chrome.storage.local.get('notifications', function (data) {
      var total = _.compose(String,_.size,_.flatten,_.values)(data.notifications)

      document.body.innerHTML = Handlebars.templates.layout({
        username:      username
      , notifications: data.notifications
      , total:         total
      })

      addClickListeners();
    })
  })
}

function addClickListeners() {
  [].forEach.call(document.querySelectorAll('thead input'), function (e) {
    e.addEventListener('click', function (click) {
      var global = this;
      var type = this.parentNode.parentNode.parentNode.parentNode.id;

      [].forEach.call(document.querySelectorAll('#' + type + ' tbody input[type=checkbox]'), function (checkbox) {
        checkbox.checked = global.checked;
      })

    })
  })
}


// HOOKS


document.addEventListener('DOMContentLoaded', function () {
  checkForCredentials();
});

