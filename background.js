<!-- Ran in the background, add the right click search -->

var count = 0;

function clickContextMenu(info) {
    var searchstring = info.selectionText;
    var options = {
        type: "basic",
        title: searchstring,
        message: "Searching for beer profile...",
        iconUrl: 'icon.png'
    }

    function creationCallback(id) {
        console.log("Succesfully created \"" + id + "\" notification");
    }

    chrome.notifications.create(searchstring + count, options, creationCallback);
    count++;

    console.log(searchstring)
}

var cmid = chrome.contextMenus.create({title: "Search for beer: %s", contexts:["selection"], onclick: clickContextMenu});

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.request === 'updateContextMenu') {
        if (!(msg.selection == '')) {
            var options = {
                title: "Search for beer: " + msg.selection,
                contexts: ['selection'],
                onclick: clickContextMenu
            };

            chrome.contextMenus.update(cmid, options);

            var xhr = new XMLHttpRequest();

            // create the search address without spaces
            var address = msg.selection;
            var notDone = true;
            while (notDone) {
                var index = address.indexOf(" ");
                if (index > -1) {
                    address = address.substring(0, index) + "+" + address.substring(index + 1, address.length);
                } else {
                    notDone = false;
                }
            }

            // grab the text of a google search for the selected text, narrowed to beer advocate beer profiles
            xhr.open("GET", "https://www.google.com/search?q=" + address + "+site:beeradvocate.com%2Fbeer%2Fprofile", true);
            xhr.onreadystatechange = function(){
                if (xhr.readyState == 4) {

                    // execute when the request returns
                    if(xhr.status == 200) {
                        // execute if the page fetch was successful

                        //extract the link we want
                        var notFound = true;
                        var skip = 0;
                        while (notFound) {
                            var index = this.responseText.indexOf("http://beeradvocate.com/beer/profile/", skip);
                            if (index > -1) {
                                console.log(this.responseText.substring(index, index + 55));
                                var end = this.responseText.indexOf("/", this.responseText.indexOf("/", index + 37) + 1);
                                if (end - index < 55) {
                                    var string = this.responseText.substring(index, end);
                                    notFound = false;
                                } else {
                                    skip = index + 1;
                                }
                            } else {
                                // google didn't find it.
                                notFound = false;
                            }
                        }

                        var options2 = {
                            title: "Found: " + string,
                            contexts: ['selection'],
                            onclick: clickContextMenu
                        };

                        chrome.contextMenus.update(cmid, options2);
                        console.log(string);
                    }
                }
            }
            xhr.send();
        }
    }
});