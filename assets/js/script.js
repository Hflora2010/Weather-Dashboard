var weatherAPIKey = "92ac65368ccc7477640749d69fd94759";
var searchBar = $("#search-bar");
var searchBtn = $("#search-button");

var lat;
var long;
var cityName;
var id;
var temp;
var windSpeed;

$(searchBtn).on("click", function() {
    var city = searchBar.val()

    // we'll call all three functions
    getGeolocation(city);
    // getWeather()
    console.log(searchBtn.val());
})

// 
searchBtn.on("click", function (event) {
    event.preventDefault();
})

// a function that gets the geolocation
function getGeolocation(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKey}&units=imperial`) //imperial is converting to fahrenheit 
    .then(response => response.json())  
    .then(data => {console.log(data)
    getGeoWeather(data.coord.lat , data.coord.lon)});    
}

// a function that gets the weather info based of the geo
function getGeoWeather(lat,lon) {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}`)
    .then(response => response.json())  
        .then(data => {console.log(data)        
        })
}

function currentWeather (data) {
    var cityName = data.name;
    var id = new Date(data.dt * 1000);
    var weatherPic = data.weather[0].icon;
    var weatherPicURL = `https://openweathermap.org/img/wn/${weatherPic}.png`;
    var temp = data.main.temp;
    var humidity = data.main.humidity;
    var WindSpeed = data.wind.speed;
}

console.log(currentWeather);





// a function that does a loop and creates elements to show each day
// for each day
// get the weather info and paint the page


// dayjs().calander(null,  {
//     nextDay: "[Tomorrow]"
// })

//showing the list of saved cities
// for (let i = 0; i < scores.length; i++) {
//     var li = document.createElement("li");
//     li.textContent = scores[i];
//     li.setAttribute("data-index", i);
//       var highScoresList = document.getElementById("highscores-list")
//     location.href = "highscores.html";
//     highScoresList.appendChild(li);
//   }