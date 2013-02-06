var appendNotification = function (notification) {
  var li = document.createElement('li')
  var date = new Date(Date.parse(notification.timestamp))
  var game_link = notification["_links"]["cs:game"]['_href']
  var chart_link = notification["_links"]["cs:game"]['_href']

  li.innerHTML = "[" + date.getUTCDate() + "]"
               + "<a href='" + game_link + "'><strong>" + notification.game + "</strong></a> &mdash; "
               + "<a href='" + chart_link + "'>" + notification.chart + "</a>";

  document.querySelector('ul').appendChild(li);
}

var loadNotifications = function (username) {
  console.log("loadNotifications")

  var username   = localStorage.username
  var api_string = "http://api.dev/users/" + username + "/notifications";

  document.querySelector(".hub > h1").innerText = "Notifications for " + username
  document.querySelector("ul").innerHTML = "<li>loading...</li>";

  xhr = new XMLHttpRequest();
  xhr.open("GET", api_string, true);
  xhr.onreadystatechange = function () {
    console.log("state", xhr.readyState);
    console.log("response", xhr.responseText)

    if (xhr.readyState == 4) {
      document.querySelector('ul').innerHTML = "";

      var notifications = JSON.parse(xhr.response)['_embedded']['notifications']

      chrome.browserAction.setBadgeText({ text: notifications.length.toString() })
      notifications.forEach(appendNotification)
    }
  }
  xhr.send();

  return username;
}

document.addEventListener('DOMContentLoaded', function () {
  Handlebars.partials = Handlebars.templates
  document.body.innerHTML = Handlebars.templates.layout({ game_name: "texting"})
  loadNotifications();
})