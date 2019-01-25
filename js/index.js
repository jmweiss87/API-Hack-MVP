state = {};

const pages = [
  {
    title: "Welcome! Let's Check Up On Your Online Account Security",
    subtitle: "Please type your email address in the search form above and click search in order to find out security information about your online accounts associated with that email.",
    body: "The search form at the top right of the page is designed to take the email you input and search for accounts associated with that email (email used for accounts with companies) that have been breached by hackers. The extent of that breach is also important, thus the query will look for news surrounding the company data breach."  
     + "It will attempt to find all of the known accounts with your email that have been breached(a data breach by an outside person or group) in recent years. For online security best practices, information, and helpful application suggestions click the Solutions tab above."
  },
  {
    title: "Solutions",
    body: "Suggestions for Computer Security and Best Practices. Will type up content when the call to the api is working again. Frustrating."
  },
  {
    title: "About Me",
    subtitle: "John Weiss",
    body: "Hey there! Thanks for visiting my page." + " This is a project I put together to practice making AJAX calls to APIs, haveIbeenPwned and NewsOrg, and displaying the data." 
     + " I went to University of South Carolina for college, have done various front-end freelance projects, and am working" 
     + " on becoming a full stack developer. I hope you enjoy this application, and find use in the information provided to better protect your data.",
    img: "addOne.png"
  },
  {
    title: "Contact",
    subtitle: "John Weiss",
    body: "jmweiss87@gmail.com"
  }
]

/* Makes the AJAX request */
function getPwned(account, successHandler){
  console.log("account: ", account);
  $.getJSON( `https://haveibeenpwned.com/api/v2/breachedaccount/${account}`, successHandler);
}

/* Second AJAX request */
function newsRequest(data){
  console.log(data);
  $.getJSON(`https://newsapi.org/v2/everything?q=${data}%20AND%20(hack%20OR%20OR%20breach)%20data&apiKey=f62ec347bf434ebba702168d677d54a0`, newsSuccessHandler);
}

/* Handles the event when the user submits the email address */
function watchSubmit(){
  $( ".js-search-form" ).submit(submitHandler);
}

/* Handles the submit event*/ 
function submitHandler(event) {
  event.preventDefault();  
  const queryTarget = $(event.currentTarget).find('.js-query');
  const queryVal = queryTarget.val();
  console.log("queryVal: ", queryVal);
  getPwned(queryVal, successHandler);
}

/* Outputs data to the console log */
function successHandler(data) {
  console.log("DATA", data);
  showSearchResults();
  
  // data argument is live, has all the info we need to make an api call for each company
  // could grab the title here, and then *map* the company names, send to newsRequest
  // newsData = newsSuccessHandler(breaches[0]);
  // newsRequest(breaches[1]);
  // so for each of the responses, i need to reference the title, to start. (eventually two)
  // need to iterate through each...
  // send it to the newsSHandler, then do the mapping there. i think.
  // set a variable here? then send it to newsRequest
  // newsData = breaches.map((company, index));
  // newsRequest(newsData);
  newsData = data.map(company => newsRequest(company.Title));
  // $('#js-results').html(newsData);
  // an FYI on .map method, if using arrow function, only close parenthesis on left side if TWO arguments.
  const breaches = data.map((breach, index) => renderBreaches(breach, index));
  $('#js-results').html(breaches);
  // if you could add the newsData to breaches on line 72 before you put breaches into the html, that would be ideal.
}

// newsSuccessHandler(newsData); this should be sent to the dom....

// SuccessHandler for News API
// deal with results from news api, remember it goes for each api request, *for each** company a request
function newsSuccessHandler(result){
  console.log(result);
  // take the info from results object and send it to the dom...
  // how to display on the DOM.....use .html or another method
}


function renderBreaches(breach, index){
 return `<div class ="breach-results">
 <h1>Company: ${breach.Name}</h1>
 <h2>Domain: ${breach.Domain}</h2>
 <h3>Breach Description: ${breach.Description}</h3>
 </div>`;}
 // shouldn't this semi-colon be outside the bracket?** Just making sure..


$(watchSubmit);



/* HTML Links */
$('.js-link').on('click', function (event){
  event.preventDefault();
  console.log(this.value);
  $('.results-container').hide();
  let index = this.value;
  $('.page-container').show();
  let finalString = pageAssembler(pages[index]);
  $('.page-container').html(finalString);
});

function showSearchResults(){
  $(".page-container").hide();
  $(".results-container").show();
}

function pageAssembler(page){
  let resultString = 
  `
  <div class="page-results">
    <h1>${page.title}</h1>
  `;
  if (page.subtitle!==null){
    resultString += `<h2>${page.subtitle}</h2>`;
  }
  resultString+= `<h3>${page.body}</h3>
  </div>
  `;
  return resultString;
}


