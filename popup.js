window.onload = function () {
  document.getElementById('save').onclick = function() {
    var value = document.getElementById('term').value;
    
    chrome.storage.sync.get({storedTerms: []}, function(data){
      console.log(data);

      var storedTerms = data.storedTerms;


      /*************** TO DO *****************/
      // check if term is already in the array
      // if not in array, push
      storedTerms.push(value);
      // if in array, display error message

      chrome.storage.sync.set({storedTerms: storedTerms}, function () {
        /*************** TO DO *****************/
        // let the user know the term was added successfully
        // clear the input field

        chrome.storage.sync.get('storedTerms', function (data) {
            document.getElementById('term').value = '';
        });
      });
    })
  }
  
  document.getElementById('viewTerms').onclick = function() {
    chrome.tabs.create({'url':'manage.html'});
  }

  document.getElementById('deleteTerms').onclick = function() {
    chrome.storage.sync.clear(function(){
    });
  }

  // when a page loads, loop through storedTerms and search DOM for those terms and hide them


}