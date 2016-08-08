// accesses information from the user's page

// need a message saying removing spoilers
alert('Please be patient while we make the internet a safer place');

window.onload = function () {
	var storedTerms = [];

	function findAndReplace(searchText, replacement, searchNode) {
	    if (!searchText || typeof replacement === 'undefined') {
	        // Throw error here if you want...
	        return;
	    }
	    var regex = typeof searchText === 'string' ?
	                new RegExp(searchText, 'i') : searchText,
	        childNodes = (searchNode || document.body).childNodes,
	        cnLength = childNodes.length,
	        excludes = 'html,head,style,title,link,meta,script,object,iframe';
	    while (cnLength--) {
	        var currentNode = childNodes[cnLength];
	        if (currentNode.nodeType === 1 &&
	            (excludes + ',').indexOf(currentNode.nodeName.toLowerCase() + ',') === -1) {
	            findAndReplace(searchText, replacement, currentNode);
	        }
	        if (currentNode.nodeType !== 3 || !regex.test(currentNode.data) ) {
	            continue;
	        }

	        // this is not reaching anchor tags

	        var parent = currentNode.parentNode/*,
	            frag = (function(){
	                var html = currentNode.data.replace(regex, replacement),
	                    wrap = document.createElement('div'),
	                    frag = document.createDocumentFragment();
	                wrap.innerHTML = html;
	                while (wrap.firstChild) {
	                    frag.appendChild(wrap.firstChild);
	                }
	                return frag;
	            })();
	        parent.insertBefore(frag, currentNode);
	        parent.removeChild(currentNode);*/
	        var newNode = document.createElement('div');
	        newNode.className = 'spoiler';
	        newNode.appendChild(document.createTextNode(replacement));
	        parent.replaceChild(newNode, currentNode);

	    }
	}

	chrome.storage.sync.get('storedTerms', function(data){
		storedTerms = data.storedTerms;

		var body = document.getElementsByTagName('body')[0]; // need this line to reset visibility
		var divs = document.getElementsByTagName('p');

		var replacement = 'There might be a spoiler here.';

		// find child nodes of body
		for (var i = 0; i < storedTerms.length; i++) {
			//console.log('looking for:', storedTerms[i], 'looking in:', divs[i])
			findAndReplace(storedTerms[i], replacement, body);
		}

		// after replacements are made, make the body visible again
		body.style.visibility = "visible";

    });
}