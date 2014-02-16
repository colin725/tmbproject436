/***
* getPage.js
* This is a content script ran in the chrome tab.
* Used to grab the text of the current page and send it back.
*/

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    // If we get a request for the page
    if (request.method && (request.method === "getPage")) {

        // Send back the content of the <html> element
        var html = document.body;
        sendResponse({ "htmlContent": html.textContent });
    }
});