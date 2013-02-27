// Calls the API to check if the credentials are correct
function areCredentialsValid() {
  return true;
}

function setInputValues(username, password) {
  document.querySelector("input[name=username]").value = username;
  document.querySelector("input[name=password]").value = password;
}

function load_options() {
  chrome.storage.sync.get(['username', 'password'], function (credentials) {
    if (!credentials.username) return;

    setInputValues(credentials.username, credentials.password)
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

function clear_options() {
  chrome.storage.sync.clear()
  chrome.storage.local.clear()
  chrome.extension.getBackgroundPage().refreshUI()

  setInputValues("","")
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace == "local") return;

  chrome.extension.getBackgroundPage().refreshNotifications();
})

document.addEventListener('DOMContentLoaded', load_options);
document.querySelector("#save").addEventListener('click', store_options);
document.querySelector("#clear").addEventListener('click', clear_options)