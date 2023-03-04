var weatherAPIKey = "92ac65368ccc7477640749d69fd94759";
var searchBar = $("#search-bar");
var searchBtn = $("#search-button");
var currentWeatherEl = document.getElementById("main-city-name-date-icon");
var currentWeatherInfoEl = document.getElementById("current-weather-info")
var currentTempEl = document.getElementById("current-temp");
var currentWindSpeedEl = document.getElementById("current-wind-speed");
var currentHumidityEl = document.getElementById("current-humidity");
var searchCitiesList = document.getElementById("searched-cities-list")

var lat;
var long;
var cityName;
var date;
var icon;
var iconURL;
var temp;
var windSpeed;
var humidity;

$(searchBtn).on("click", function () {
    var city = searchBar.val()

    // we'll call all three functions
    getGeolocation(city);
    console.log(searchBtn.val());

})

$(searchBtn).on("click", function () {
    var city = searchBar.val();
    localStorage.setItem("city", city);
})

searchBtn.on("click", function (event) {
    event.preventDefault();
})

var searchHistory = [];

// The following function renders items in a todo list as <li> elements
function renderSearchHistory() {
    // Clear search-history-list element
    searchCitiesList.innerHTML = "";

    // Render a new li for each searched city
    for (var i = 0; i < searchHistory.length; i++) {
        var searchHistorycity = city[i];

        var li = document.createElement("li");
        li.textContent = history;
        li.setAttribute("data-index", i);

        searchCitiesList.appendChild(li);
    }
}

// a function that gets the geolocation
function getGeolocation(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKey}&units=imperial`) //imperial is converting to fahrenheit 
        .then(response => response.json())
        .then(data => {
            console.log(data)
            getGeoWeather(data.coord.lat, data.coord.lon)
        });
}

// a function that gets the weather info based of the geo
function getGeoWeather(lat, lon) {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}&units=imperial`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            currentWeather(data);
            fiveDayForecast(data);
        })
}

function currentWeather(data) {
    var cityName = data.city.name;
    console.log(cityName);
    var date = new Date(data.list[0].dt * 1000).toLocaleDateString("en-US");
    console.log(date);
    var icon = data.list[0].weather[0].icon;
    console.log(icon);
    var iconURL = `https://openweathermap.org/img/wn/${icon}.png`;
    console.log(iconURL);
    var temp = data.list[0].main.temp;
    console.log(temp);
    var humidity = data.list[0].main.humidity;
    console.log(humidity);
    var windSpeed = data.list[0].wind.speed;
    console.log(windSpeed);

    document.getElementById("main-city-name-date").innerHTML = cityName + " " + date;
    document.getElementById("icon").src = iconURL;
    document.getElementById("current-temp").innerHTML = "Temperature: " + temp;
    document.getElementById("current-wind-speed").innerHTML = "Wind Speed: " + windSpeed + " m/s";
    document.getElementById("current-humidity").innerHTML = "Humidity: " + humidity + "%";
}

function fiveDayForecast(data) {
    var cityName = data.city.name;
    console.log(cityName)
    // var date =;
    var icon = data.list[0].weather[0].icon;
    var iconURL = `https://openweathermap.org/img/wn/${icon}.png`;
    var temp = data.list[0].main.temp;
    var humidity = data.list[0].main.humidity;
    var windSpeed = data.list[0].wind.speed;

    // document.getElementById ("main-city-name-date").innerHTML = (day.js(nextDay)date);
    document.getElementById("five-day-icon").src = iconURL;
    document.getElementById("five-day-temp").innerHTML = "Temperature: " + temp;
    document.getElementById("five-day-speed").innerHTML = "Wind Speed: " + windSpeed + " m/s";
    document.getElementById("five-day-humidity").innerHTML = "Humidity: " + humidity + "%";

}

$("#9 .description").val(localStorage.getItem("9"));









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