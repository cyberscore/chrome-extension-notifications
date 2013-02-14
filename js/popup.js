Handlebars.partials = Handlebars.templates;
Handlebars.registerHelper('formatDate', function (date) {
  return moment(date).format('DD MMM')
})
Handlebars.registerHelper('fullType', function (type) {
  var types = { ygb: 'You Got Beat'
              , proof_refused: 'Proof Refused'
              , rec_approved: 'Record approved'
              };

  return types[type[0].type];
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
  localStorage.clear(); console.log("localStorage cleared.");
  chrome.tabs.create({ url: 'options.html' })
}

function getNotifications() {
  return JSON.parse(localStorage.getItem('notifications'));
}

function displayNotifications() {
  chrome.storage.sync.get('username',function (data) {
    var username = data.username;

    chrome.storage.local.get('notifications', function (data) {
      var total = _.compose(String,_.size,_.flatten,_.values)(data.notifications)
      chrome.browserAction.setBadgeText({ text: total })

      document.body.innerHTML = Handlebars.templates.layout({
        username:      username
      , notifications: data.notifications
      , total:         total
      })
    })
  })
}


document.addEventListener('DOMContentLoaded', function () {
  checkForCredentials();
})
