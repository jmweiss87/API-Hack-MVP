// jQuery.getJSON  url [, data ] [, success ] 
state = {};

const pages = [
  {
    title: "Welcome!",
    subtitle: "Explanation of what this site is about.",
    body: "The search bar above the navigation is designed for you to input your email. Once you have done that and click search it will find all of the known accounts with your email that have been breached in recent years. Thus, at that point it would be a good idea to change your password. More security tips and information are on the Solutions page! "
  },
  {
    title: "Solutions",
    body: "Suggestions for Computer Security and Best Practices."
  },
  {
    title: "About Me",
    subtitle: "John Weiss",
    body: "Hey there! Thanks for visiting my page!" + " This is a project I put together to practice making API calls and displaying the data." 
     + " I went to University of South Carolina for college, have done various front-end freelance projects, and am working" 
     + " on becoming a full stack developer. I hope you enjoy, and find use in this page!",
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
  const breaches = data.map((breach, index) => renderBreaches(breach, index));
  $('#js-results').html(breaches);
}


function renderBreaches(breach, index){
 return `<div class ="breach-results">
 <h1>Company: ${breach.Name}</h1>
 <h2>Domain: ${breach.Domain}</h2>
 <h3>Breach Description: ${breach.Description}</h3>
 </div>`;}


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


