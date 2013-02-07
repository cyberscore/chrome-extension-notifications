Handlebars.partials = Handlebars.templates;
Handlebars.registerHelper('formatDate', function (date) {
  return moment(date).format('DD MMM')
})

function checkForCredentials() {
  chrome.storage.sync.get(function (data) {
    if (data.username != "") {
      displayNotifications();
      return;
    }

    window.close();
    localStorage.clear()
    chrome.tabs.create({ url: 'options.html' })
  })
}

function getNotifications() {
  return JSON.parse(localStorage.getItem('notifications'));
}

function displayNotifications() {
  chrome.storage.sync.get('username' ,function (data) {
    document.body.innerHTML = Handlebars.templates.layout({
      username: data.username
    , notifications: getNotifications()
    })
  })
}


document.addEventListener('DOMContentLoaded', function () {
  checkForCredentials();
})
