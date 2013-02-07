// Calls the API to check if the credentials are correct
function areCredentialsValid() {
  return true;
}

function load_options() {
  chrome.storage.sync.get(['username', 'password'], function (credentials) {
    if (!credentials.username) return;

    document.querySelector("input[name=username]").value = credentials.username;
  });
}

var CyberscoreUser = Object.create({})

function store_options() {
  var username = this.form.username.value;

  chrome.storage.sync.set({
    username: username
  , password: ""
  })

  chrome.extension.getBackgroundPage().fetchNotifications();

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

document.addEventListener('DOMContentLoaded', load_options);
document.querySelector("button[type=submit]").addEventListener('click', store_options);