// jQuery.getJSON  url [, data ] [, success ] 
state = {};

/* Makes the AJAX request */
function getPwned(account, successHandler){
  console.log("account: ", account);
  $.getJSON( `https://haveibeenpwned.com/api/v2/breachedaccount/${account}`, successHandler);
}


// function for success, call successHandler, pass successHandler as
// a parameter to getPwned(successHandler), ie.
// send queryTarget over to getPwned so can work with them.

/* Handles the event when the user submits the email address */
function watchSubmit(){
  $( ".js-search-form" ).submit(submitHandler);
}

/* Handles the submit event*/ 
function submitHandler(event) {
  event.preventDefault();  
  const queryTarget = $(event.currentTarget).find('.js-query');
  const queryVal = queryTarget.val();
  // queryVal.val("") ?
  //now I want to take this query, send it in ajax call.
  //so..account is going to equal queryVal....
  console.log("queryVal: ", queryVal);
  getPwned(queryVal, successHandler);
}

/* Outputs data to the console log */
// map call in here....
// inconsistency here...with the parameer, breach or breaches...hmm maybe not.
function successHandler(data) {
  console.log("DATA", data);
  const breaches = data.map((breach, index) => renderBreaches(breach, index));
  $('#js-results').html(breaches);
}

// notice how breaches includes your function renderBreaches, thus the variable is passing it to id #js-results
// this shows how your div breach-results ended up in the correct place.

//need to find out about images for company, logos.

function renderBreaches(breach, index){
 return `<div class ="breach-results">
 <h1>${breach.Name}</h1>
 <h2>${breach.Domain}</h2>
 <h3>${breach.Description}</h3>
 <div>`;}

// form class or id for submit is target.
$(watchSubmit);