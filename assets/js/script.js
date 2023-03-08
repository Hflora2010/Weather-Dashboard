var weatherAPIKey = "92ac65368ccc7477640749d69fd94759";
var searchBar = $("#search-bar");
var searchBtn = $("#search-button");
var currentWeatherEl = document.getElementById("main-city-name-date-icon");
var currentWeatherInfoEl = document.getElementById("current-weather-info")
var currentTempEl = document.getElementById("current-temp");
var currentWindSpeedEl = document.getElementById("current-wind-speed");
var currentHumidityEl = document.getElementById("current-humidity");
var searchCitiesList = document.getElementById("searched-cities-list")
const container = document.getElementById("five-day-forecast-container")

var searchHistory = [];
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
    getGeolocation(city);
    console.log(searchBtn.val());

})

$(searchBtn).on("click", function () {
    var city = searchBar.val();
    searchHistory.push(city);
    localStorage.setItem("city", JSON.stringify(searchHistory));
})

searchBtn.on("click", function (event) {
    event.preventDefault();
})


// The following function renders items in a search history list as <li> elements
function renderSearchHistory() {
    // Clear search-history-list element
    searchCitiesList.innerHTML = "";
    searchHistory = JSON.parse(localStorage.getItem("city"));

    // Render a new li for each searched city
    if (!searchHistory) {
        searchHistory = [];
    } else {
        for (var i = 0; i < searchHistory.length; i++) {
            var searchHistorycity = searchHistory[i];
            let button = document.createElement("button");
            // tutor code here
            button.setAttribute('type', 'button')
            // button.setAttribute('aria-controls', 'today forecast')
            // button.classList.add('class1', 'class2')
            button.setAttribute('random', searchHistory[i])
            button.textContent = searchHistory[i]
            // appnd
            // end tutor code
            button.textContent = searchHistorycity;
            button.setAttribute("data-index", i);
            button.addEventListener('click', whatev)
            searchCitiesList.appendChild(button);
        }
    }
}
renderSearchHistory();

function whatev(e) {
    container.innerHTML = ""
    var button = e.target
    var search = button.getAttribute('random')
    getGeolocation(search)
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
            retrieveFiveDayForecast(data);
        })
}

function currentWeather(data) {
    var cityName = data.city.name;
    var date = new Date(data.list[0].dt * 1000).toLocaleDateString("en-US");
    let date2 = dayjs(date).format('MM/DD/YYYY')
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
    document.getElementById("current-temp").innerHTML = "Temperature: " + temp + "°";
    document.getElementById("current-wind-speed").innerHTML = "Wind Speed: " + windSpeed + " m/s";
    document.getElementById("current-humidity").innerHTML = "Humidity: " + humidity + "%";
}


function retrieveFiveDayForecast(data) {
    var cityName = data.city.name;
    console.log(data)
    var date = data.list.dt_txt;
    // let date2 = dayjs(date).format('MM/DD/YYYY')
    var icon = data.list[0].weather[0].icon;
    var iconURL = `https://openweathermap.org/img/wn/${icon}.png`;
    var temp = data.list[0].main.temp;
    var humidity = data.list[0].main.humidity;
    var windSpeed = data.list[0].wind.speed;

    // var startFiveDayForecast = dayjs().add(1, 'day').startOf('day').unix();
    // var endFiveDayForecast = dayjs().add(6, 'day').startOf('day').unix();
    // // console.log(startFiveDayForecast , endFiveDayForecast);

            container.innerHTML = ""

            data.list.forEach(date => {
                if (date.dt_txt.includes("12:00:00")) {
                    let dateEl = document.createElement("h3");
                    container.append(dateEl);
                    dateEl.textContent = new Date(date.dt * 1000).toLocaleDateString("en-US");
                    let iconEL = document.createElement("img");
                    container.append(iconEL);
                    iconEL.src = `https://openweathermap.org/img/wn/${icon}.png`;
                    let div = document.createElement("div");
                    container.append(div);
                    let temp = document.createElement("p");
                    div.append(temp);
                    temp.textContent = "Temperature: " + data.list[0].main.temp + "°";
                    let windSpeed = document.createElement("p");
                    div.append(windSpeed);
                    windSpeed.textContent = "Wind Speed: " + data.list[0].wind.speed + "m/h";
                    let humidity = document.createElement("p");
                    div.append(humidity)
                    humidity.textContent = "Humidity: " + data.list[0].main.humidity + "%";
                }}
            )};