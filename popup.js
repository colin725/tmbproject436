/***
* popup.js
* The script which runs when the pop-up is created.
* Used to query the content script and push the responce back into our pop-up.
*/

// Query the active tab for data
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

	// If there is an active tab...
	if (tabs.length > 0) {
	
		// Send a message requesting the page
		chrome.tabs.sendMessage(tabs[0].id, {method: "getPage"}, function(response) {

			if (chrome.runtime.lastError) {
				// An error occurred, log it
				console.log("ERROR: ", chrome.runtime.lastError);
			} else {
				// We got the html content
				console.log(response.htmlContent);
			}

		});
	}
});