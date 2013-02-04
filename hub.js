var appendNotification = function (notification) {
  var li = document.createElement('li')
  var date = new Date(Date.parse(notification.timestamp))
  var link = "http://cyberscore.me.uk/chart/66354"

  li.innerHTML = "[" + date + "]"
               + " <strong>" + notification.game + "</strong> &mdash; "
               + "<a href='" + link + "'>" + notification.chart + "</a>";

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
          notifications.forEach(appendNotification)
    }
  }
  xhr.send();

  return username;
}

document.addEventListener('DOMContentLoaded', function () {
  loadNotifications();
})