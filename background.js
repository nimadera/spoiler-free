chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
	// response: whatever is sent by the content script
	// sender: information about the tab that is sending info to the background script
	// sendResponse: sends a response back to the content script

	// alert(response);

})