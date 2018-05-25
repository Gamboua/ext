var $  = require('jquery');
var md5 = require('blueimp-md5');

chrome.runtime.onInstalled.addListener(function() {
 chrome.alarms.create('magalu', {
      delayInMinutes: 0.1, periodInMinutes: 0.1
  });
  
  chrome.alarms.onAlarm.addListener(function( alarm ) {
    chrome.cookies.getAll({},function (data) {
      data.find(item => {
        if (item.domain == 'm.magazineluiza.com.br' && item.name == 'id_user' && item.value) {
          $.get('https://m.magazineluiza.com.br/orders/list.json?limit=5').done(function (data) {
            var hash = md5(JSON.stringify(data));
            console.log(hash, 'response');
            chrome.storage.local.get(['key'], function(result) {
              if(result) { 
                if (result.key != hash) {
                  chrome.browserAction.setBadgeText ( { text: "1" } );
                  chrome.storage.local.set({key: hash}, function(result) {});
                }
              }
            });
          });
        }
      });
    })
  });

});

chrome.browserAction.setBadgeBackgroundColor({color: "red"});

