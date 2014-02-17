<!-- Ran in the background, add the right click search -->

chrome.contextMenus.create({title: "Search for beer: %s", contexts:["selection"], onclick: clickContextMenu});
var count = 0;

function clickContextMenu(info) {
    var searchstring = info.selectionText;
    var cmid = searchstring + count;
    var options = {
        type: "basic",
        title: searchstring,
        message: "Searching for beer profile...",
        iconUrl: 'icon.png'
    }

    function creationCallback(id) {
        console.log("Succesfully created \"" + id + "\" notification");
    }

    chrome.notifications.create(cmid, options, creationCallback);

    // notification is created with no information in it.  Kick off a request to get the beer profile.
    var xhr = new XMLHttpRequest();

    // create the search address without spaces
    var address = searchstring;
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
                var balink;
                while (notFound) {
                    var index = this.responseText.indexOf("http://beeradvocate.com/beer/profile/", skip);
                    if (index > -1) {
                        var end = this.responseText.indexOf("/", this.responseText.indexOf("/", index + 37) + 1);
                        if (end - index < 55) {
                            balink = this.responseText.substring(index, end);
                            notFound = false;
                        } else {
                            skip = index + 1;
                        }
                    } else {
                        // google didn't find it.
                        notFound = false;
                    }
                }

                if (typeof balink === 'undefined') {

                    // we didn't find a ba link, update the notification to say we failed.
                    console.log("No beer found");
                    options = {
                        type: "basic",
                        title: searchstring,
                        message: "We could not find a beer with the selected text, sorry.",
                        iconUrl: 'icon.png'
                    }
                    chrome.notifications.update(cmid, options, function() {});
                } else {

                    // Update the notification to say we found the beer
                    console.log("Link found: " + balink);
                    options = {
                        type: "basic",
                        title: searchstring,
                        message: "Found beer profile, loading info...",
                        iconUrl: 'icon.png'
                    }
                    chrome.notifications.update(cmid, options, function() {
                        console.log("was updated!");
                    });

                    // Now we send off another request!
                    xhr.open("GET", balink, true);
                    xhr.onreadystatechange = function(){
                        if (xhr.readyState == 4) {
                            console.log("get returned");
                            // execute when the request returns
                            if(xhr.status == 200) {
                                // execute if the page fetch was successful

                                // grab the title, brewery, location, and average score

                                var title;
                                var index = this.responseText.indexOf("<title>") + 7;
                                var end = this.responseText.indexOf("|", index);
                                title = this.responseText.substring(index, end - 1);

                                var brewery;
                                index = end + 2;
                                end = this.responseText.indexOf("|", index);
                                brewery = this.responseText.substring(index, end - 1);

                                var location;
                                index = end + 2;
                                end = this.responseText.indexOf("|", index);
                                location = this.responseText.substring(index, end - 1);

                                var ravg;
                                index = this.responseText.indexOf("rAvg:") + 6;
                                end = this.responseText.indexOf("<", index);
                                ravg = this.responseText.substring(index, end);

                                // send update to our notification
                                options = {
                                    type: "basic",
                                    title: "[" + ravg + "] " + title,
                                    message: brewery + "\n" + location,
                                    iconUrl: 'icon.png'
                                }
                                chrome.notifications.update(cmid, options, function() {
                                    console.log("was fully updated!");
                                });

                                chrome.notifications.onClicked.addListener(function(notificationId) {
                                    // TODO: Possibly move this code out of here?  It will work fine here though.
                                    if (cmid === notificationId) {
                                        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                                                chrome.tabs.create({ url: balink });
                                        });
                                    }
                                });
                            }
                        }
                    }
                    xhr.send();
                }
            }
        }
    }
    xhr.send();
    
    count++;

    console.log(searchstring)
}

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.request === 'updateContextMenu') {
        // TODO: speed up searches by doing them here before the user asks for it.  May get complicated with us sending information to and from the above method async.
    }
});