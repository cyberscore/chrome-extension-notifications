PromisedStorage = function(storage) {
  this.storage = storage;
}
PromisedStorage.prototype.request = function (action, stuffs) {
  var request = this.storage[action]

  var promise = RSVP.Promise(function (resolve, reject) {
  request(stuffs, function (data) {
    if (chrome.runtime.lastError) { reject(chrome.runtime.lastError) }

    resolve(data)
  })
})

  return promise;
}

PromisedStorage.prototype.store = function (stuffs) {
  // var dat = this;
  // var promise = RSVP.Promise(function (resolve, reject) {
  // })
  return this.request('set', stuffs)
}

p = new PromisedStorage(chrome.storage.local)
p.store({ 'username': 'troll' })

var storeInStorage = function (stuffs) {
  var promise = RSVP.Promise(function (resolve, reject) {
    chrome.storage.local.set(stuffs, function () {
      if (chrome.runtime.lastError) { reject(chrome.runtime.lastError) }

      resolve()
    })
  })

  return promise;
}
storeInStorage({ 'username': 'troll' }).then(function (data) {
  console.log(data)
})






function getJSON(url) {
  var promise = new RSVP.Promise(function (resolve, reject) {
    var path = "http://api.dev/users/locks/notifications"
    var username = "locks"
    var password = "7319046825"

    var xhr = new XMLHttpRequest();
    xhr.open("GET", api_root, true, username, password);
    xhr.onreadystatechange =  handler();
    xhr.responseType = "json";
    xhr.setRequestHeader("Accept", "application/json");
    xhr.send();

    function handler () {
      if (xhr.readyState == this.DONE) {
        if (this.status == 200) resolve(this.response);
        else                    reject(this);

        var notifications = JSON.parse(xhr.response)['_embedded']['notifications'];

        notifications = processNotifications(notifications);
        storeNotifications(notifications);
      }
    }
  })

  return promise;
}