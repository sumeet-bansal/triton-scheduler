
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

  	chrome.identity.getAuthToken({ interactive: true }, function(token) {
	    if (chrome.runtime.lastError) {
	        alert(chrome.runtime.lastError.message);
	        return;
	    }
	    var x = new XMLHttpRequest();
	    x.open('GET', 'https://www.googleapis.com/calendar/v3/users/me/calendarList?access_token=' + token);
	    x.onload = function() {
	        alert(x.response);
	    };
	    x.send();
	});

	sendResponse(request);

});