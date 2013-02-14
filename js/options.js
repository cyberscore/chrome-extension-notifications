// Calls the API to check if the credentials are correct
function areCredentialsValid() {
  return true;
}

function load_options() {
  chrome.storage.sync.get(['username', 'password'], function (credentials) {
    if (!credentials.username) return;

    document.querySelector("input[name=username]").value = credentials.username;
    document.querySelector("input[name=password]").value = credentials.password;
  });
}

var CyberscoreUser = Object.create({})

function store_options() {
  var form     = document.forms.credentials;
  var username = form.username.value;
  var password = form.password.value;

  chrome.storage.sync.set({
    username: username
  , password: password
  }, function () { show_in_status() })
}

function show_in_status() {
  var status_element = document.getElementById('status');

  status_element.style.visibility = 'visible';

  setTimeout(function () {
    status_element.style.visibility = 'hidden';
  }, 750)
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace == "local") return;

  chrome.extension.getBackgroundPage().fetchNotifications();
})

document.addEventListener('DOMContentLoaded', load_options);
document.querySelector("button#save").addEventListener('click', store_options);