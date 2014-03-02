<!-- Ran in the background, add the right click search -->

chrome.contextMenus.create({title: "Search for beer: %s", contexts:["selection"], onclick: clickContextMenu});
chrome.contextMenus.create({title: "Search image for beer.", contexts:["image"], onclick: clickContextMenu});
var count = 0;

function clickContextMenu2(info) {
    var searchstring = info.srcUrl;
    console.log(searchstring);
}

function clickContextMenu(info) {
    var searchstring = info.selectionText;
	var finalAddress;
	var icon_default = 'icon128.png';
    var icon_address;

	if (searchstring != null) {
		// We were called on text selection.
		// Create the search address without spaces
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
		finalAddress = "https://www.google.com/search?q=" + address + "+site:beeradvocate.com%2Fbeer%2Fprofile";
	} else {
		// We were called on an image
		var address = info.srcUrl;
		console.log(address);
		finalAddress = "https://www.google.com/searchbyimage?site=search&image_url=" + address;
		searchstring = "Image search...";

		// We can use the image as the notification icon
		icon_address = info.srcUrl;
	}

    var cmid = searchstring + count;
    var options = {
        type: "basic",
        title: searchstring,
        message: "Searching for beer profile...",
        iconUrl: icon_default
    }

    function creationCallback(id) {
        console.log("Succesfully created \"" + id + "\" notification");
    }

    chrome.notifications.create(cmid, options, creationCallback);

	if (icon_address != null) {
		// Send a fetch for the image and replace our icon with it in the notification
		var xhr2 = new XMLHttpRequest();
		xhr2.open("GET", icon_address);
		xhr2.responseType = "blob";
		xhr2.onload = function(){
			var blob = this.response;
			icon_default = window.URL.createObjectURL(blob);
			options.iconUrl = icon_default;
			chrome.notifications.update(cmid, options, creationCallback);
		};
		xhr2.send(null);
	}
    // notification is created with no information in it.  Kick off a request to get the beer profile.
    var xhr = new XMLHttpRequest();

    // grab the text of a google search for the selected text, narrowed to beer advocate beer profiles
    xhr.open("GET", finalAddress, true);
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4) {

            // execute when the request returns
            if(xhr.status == 200) {
                // execute if the page fetch was successful
				// console.log(this.responseText);

                //extract the link we want
                var notFound = true;
                var skip = 0;
                var balink;
                while (notFound) {
                    var index = this.responseText.indexOf("beeradvocate.com/beer/profile/", skip);
                    if (index > -1) {
                        var end = this.responseText.indexOf("/", this.responseText.indexOf("/", index + 30) + 1);
                        if (end - index < 48) {
                            balink = "http://" + this.responseText.substring(index, end);
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
                        message: "We could not find a relevant beer, sorry.",
                        iconUrl: icon_default
                    }
                    chrome.notifications.update(cmid, options, function() {});
                } else {

                    // Update the notification to say we found the beer
                    console.log("Link found: " + balink);
                    options = {
                        type: "basic",
                        title: searchstring,
                        message: "Found beer profile, loading info...",
                        iconUrl: icon_default
                    }
                    chrome.notifications.update(cmid, options, function() {
                        console.log("was updated!");
                    });

                    // Now we send off another request!
                    xhr.open("GET", balink, true);
                    xhr.onreadystatechange = function(){
                        if (xhr.readyState == 4) {
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

								var style;
								index = this.responseText.indexOf("<a href=\"/beer/style/");
								var index2 = this.responseText.indexOf("<b>", index) + 3;
                                end = this.responseText.indexOf("<", index2);
                                style = this.responseText.substring(index2, end);

								var abv;
								index = this.responseText.indexOf(";", index2) + 1;
                                end = this.responseText.indexOf("<", index);
                                abv = this.responseText.substring(index, end);

								if (icon_default == 'icon128.png') {
									index = this.responseText.indexOf("<img src=\"") + 10;
									end = this.responseText.indexOf("\"", index + 12);

										console.log(this.responseText.substring(index, end));
									// Send a fetch for the image and replace our icon with it in the notification
									var xhr2 = new XMLHttpRequest();
									xhr2.open("GET", this.responseText.substring(index, end));
									xhr2.responseType = "blob";
									xhr2.onload = function(){
										var blob = this.response;
										icon_default = window.URL.createObjectURL(blob);
										options.iconUrl = icon_default;
										chrome.notifications.update(cmid, options, creationCallback);
									};
									xhr2.send(null);
								}

                                // send update to our notification
                                options = {
                                    type: "basic",
                                    title: "[" + ravg + "] " + title,
                                    message: brewery + "\n" + location + "\n" + abv + style,
                                    iconUrl: icon_default
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
}

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.request === 'updateContextMenu') {
        // TODO: speed up searches by doing them here before the user asks for it.  May get complicated with us sending information to and from the above method async.
    }
});