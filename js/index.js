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

function callMapAPI(breach, index){
  var map;
  var service;
  var infowindow;

  function initMap() {
    var mapCenter = new google.maps.LatLng(-33.8617374,151.2021291); // This is starting point for map
    //on line 43, change the 'map' in there to a variable....
    map = new google.maps.Map(document.getElementById('map'), {
      center: mapCenter,
      zoom: 15  // obvi, the zoom or starting zoom for the map
    });
    // query on 49 needs to be based on the breach name, `${breach.name}`
    var request = {
      query: `${breach.name}`,
      // fields: ['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry'],
    };

    service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, callback);
  }

  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        createMarker(results[i]);  // do some research on createMarker method and what it does...
      }
    }
  }
}

function handleMaps(data) {
  const breaches = data.map((breach, index) => callMapAPI(breach, index));
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
// map call in here....
function successHandler(data) {
  console.log("DATA", data);
  showSearchResults();
  const breaches = data.map((breach, index) => renderBreaches(breach, index));
  $('#js-results').html(breaches);
  //handleMaps(); this should be be where handleMaps(); is called! what parameter?
}

// notice how breaches includes your function renderBreaches, thus the variable is passing it to 
// id #js-results
// this shows how your div breach-results ended up in the correct place.

function renderBreaches(breach, index){
 return `<div class ="breach-results">
 <h1>Company: ${breach.Name}</h1>
 <h2>Domain: ${breach.Domain}</h2>
 <h3>Breach Description: ${breach.Description}</h3>
 </div>`;}

// form class or id for submit is target.
$(watchSubmit);

//<img src=${breach.LogoType}>


/* HTML Links */

$('.js-link').on('click', function (event){
  event.preventDefault();
  // let index= event.val();
  // the above did not work, this.value and event.currentTarget.value both worked same.

  console.log(this.value);
  $('.results-container').hide();
  // console.log(event.currentTarget.value);
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


// var map;
// var service;
// var infowindow;

// function initMap() {
//   var mapCenter = new google.maps.LatLng(-33.8617374,151.2021291);

//   map = new google.maps.Map(document.getElementById('map'), {
//     center: mapCenter,
//     zoom: 15
//   });

//   var request = {
//     query: 'Museum of Contemporary Art Australia',
//     fields: ['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry'],
//   };

//   service = new google.maps.places.PlacesService(map);
//   service.findPlaceFromQuery(request, callback);
// }

// function callback(results, status) {
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     for (var i = 0; i < results.length; i++) {
//       var place = results[i];
//       createMarker(results[i]);
//     }
//   }
// }


// ` 
// <div class="page-results">
//   <h1>${pages[index].title}</h1>
//   <h2>${pages[index].subtitle}</h2>
//   <h3>${pages[index].body}</h3>
// </div>
// `      

//hide page container, show results container

// now when someone clicks search, hide the page-container.
// now, how to re-use the breach results CSS.

// getting uncaught typererror, cannot read property of title of undefined
// Now the number values are connected, 0,1,2,3...
// need to have them pull up the content now. ******

//Ah! so how are we conntecting it to our object??

// example code: 
// $('main').html(pages[1].body);
// So, what I need is to replace main with #js-results
// that is done so now, the 1 inside pages (the object) needs to be a variable value
// and this variable value needs to select the content from my object pages...
// like his example pages[1].body
// how am I going to get it to not only select each of the 4 indeces of the object
// but then I need to select the keys inside of it! 
// the quizApp may have some answers / refresh my memory.

// and if statement might do the trick. so might a loop. HERE****

// let index = this.val();
// inside event listener, will get whatever is inside html attribute
// values of 0-3
// will reference const pages array...indexes to ref const pages obj w/ content.

// value can be used in both button and list , the a anchor tag cannot have value