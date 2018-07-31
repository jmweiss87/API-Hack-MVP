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
  //now I want to take this query, send it in ajax call.
  //so..account is going to equal queryVal....
  console.log("queryVal: ", queryVal);
  getPwned(queryVal, successHandler);
}

/* Outputs data to the console log */
function successHandler(data) {
  console.log("DATA", data);
}

// form class or id for submit is target.
$(watchSubmit);



//const HAVE_BEEN_PWNED_URL = `https://haveibeenpwned.com/api/v2/breachedaccount/${account}`;
// GET https://haveibeenpwned.com/api/v2/{service}/{parameter}