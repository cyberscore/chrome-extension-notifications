var counter = 0;

function updateBadge() {
  alert("will it work?")
  chrome.browserAction.setBadgeText({ text: counter.toString() })
  counter++;

  updateBadge()
}

// function onInit() {
//   alert("onInit");
//   console.log("onInit", "onInit");
//
//   var delay = Date.now() + 300;
//
//   chrome.alarms.create('refresh', { when: delay });
// }


chrome.runtime.onInstalled.addListener(function () {
  console.log("listener", "onInstalled")
  alert("WHAT")
  chrome.browserAction.setBadgeText({ text: "15" })
});

chrome.alarms.onAlarm.addListener(function (alarm) {
  console.log("listener", "onAlarm")
  chrome.browserAction.setBadgeText({ text: counter.toString() });
  counter = counter + 1;
})

chrome.alarms.create("refresh", { periodInMinutes: 0.1 });
chrome.browserAction.setBadgeText({ text: "ON" })
