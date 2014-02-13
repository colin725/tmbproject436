// Copyright (c) 2012 fsck. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


document.addEventListener('DOMContentLoaded', function () {
  var alltext;
  chrome.tabs.sendRequest(tab.id, {action : 'getSource'}, function(source) {
      console.log(source);
  });

  var bl = document.getElementById('beerList');
  var anchor = document.createElement("a");
  anchor.href = "http://beeradvocate.com/beer/profile/10607/88889/";
  anchor.target="_blank";
  anchor.innerText = alltext;
  console.log(alltext);
  var elem = document.createElement("li");
  elem.appendChild(anchor);
  bl.appendChild(elem);
});
