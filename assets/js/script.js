var weatherAPIKey = "92ac65368ccc7477640749d69fd94759";
var searchBar = $("#search-bar");
var searchBtn = $("#search-button");
var currentWeatherEl = document.getElementById("main-city-name-date-icon");
var currentWeatherInfoEl = document.getElementById("current-weather-info")
var currentTempEl = document.getElementById("current-temp");
var currentWindSpeedEl = document.getElementById("current-wind-speed");
var currentHumidityEl = document.getElementById("current-humidity");
var searchCitiesList = document.getElementById("searched-cities-list");
const container = document.getElementById("five-day-forecast-container");
var mainWeather = document.getElementById("main-weather.container");
let searchHistory = JSON.parse(localStorage.getItem('city')) ?? [];
var lastSearchedCity = searchHistory[searchHistory.length - 1]
console.log("lastSearchedCity", lastSearchedCity);

var lat;
var long;
var cityName;
var date;
var icon;
var iconURL;
var temp;
var windSpeed;
var humidity;

if(lastSearchedCity){
    getGeolocation(lastSearchedCity);
}

$(searchBtn).on("click", function (event) {
    event.preventDefault();
    var city = searchBar.val();
    console.log(city);
    if(city == ""){
        return false;
    }
    getGeolocation(city);
    // console.log(searchBtn.val());
    if(!searchHistory.includes(city)){
        searchHistory.push(city);
    } else{
        searchHistory = searchHistory.filter(elem => elem !== city);
        searchHistory.push(city);
    }

    localStorage.setItem("city", JSON.stringify(searchHistory));

})



// The following function renders items in a search history list as <button> elements
function renderSearchHistory() {
    // Clear search-history-list element
    searchCitiesList.innerHTML = "";
    searchHistory = JSON.parse(localStorage.getItem("city"));

    // Render a new button for each searched city
    if (!searchHistory) {
        searchHistory = [];
    } else {
        // for (var i = 0; i < searchHistory.length; i++) {
        //     var searchHistorycity = searchHistory[i];
        //     let button = document.createElement("button");
        //     button.setAttribute('type', 'button')
        //     button.setAttribute('city', searchHistorycity)
        //     button.textContent = searchHistorycity;
        //     button.setAttribute("data-index", i);
        //     button.addEventListener('click', getSearchHistoryWeather)
        //     searchCitiesList.appendChild(button);
        // }

        for (var i = searchHistory.length - 1 ; i >= 0; i--) {
            var searchHistorycity = searchHistory[i];
            let button = document.createElement("button");
            button.setAttribute('type', 'button')
            button.setAttribute('city', searchHistorycity)
            button.textContent = searchHistorycity;
            button.setAttribute("data-index", i);
            button.addEventListener('click', getSearchHistoryWeather)
            searchCitiesList.appendChild(button);
        }
    }
}
renderSearchHistory();

function getSearchHistoryWeather(event) {
    container.innerHTML = ""
    var button = event.target
    var search = button.getAttribute('city')
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
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}&units=imperial`)
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
    document.getElementById("current-temp").innerHTML = "Temperature: " + temp + "°" + "F";
    document.getElementById("current-wind-speed").innerHTML = "Wind Speed: " + windSpeed + " m/s";
    document.getElementById("current-humidity").innerHTML = "Humidity: " + humidity + "%";
}

function retrieveFiveDayForecast(data) {
    var cityName = data.city.name;
    var date = data.list.dt_txt;
    var icon = data.list[0].weather[0].icon;
    var iconURL = `https://openweathermap.org/img/wn/${icon}.png`;
    var temp = data.list[0].main.temp;
    var humidity = data.list[0].main.humidity;
    var windSpeed = data.list[0].wind.speed;

    var startFiveDayForecast = dayjs().add(1, 'day').startOf('day').unix();
    var endFiveDayForecast = dayjs().add(6, 'day').startOf('day').unix();
    console.log(startFiveDayForecast , endFiveDayForecast);

    container.innerHTML = "";
    console.log(data);

            data.list.forEach(day => {
                if (day.dt_txt.includes("12:00:00")) {
                    let wrapper = document.createElement("div");
                    $(wrapper).addClass("day");
                    let dateEl = document.createElement("h3");
                    wrapper.append(dateEl);
                    dateEl.textContent = new Date(day.dt * 1000).toLocaleDateString("en-US"
                    );
                    let iconEL = document.createElement("img");
                    wrapper.append(iconEL);
                    iconEL.src = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
                    let div = document.createElement("div");
                    wrapper.append(div);
                    let temp = document.createElement("p");
                    div.append(temp);
                    temp.textContent = "Temperature: " + day.main.temp + "°" + "F";
                    let windSpeed = document.createElement("p");
                    div.append(windSpeed);
                    windSpeed.textContent = "Wind Speed: " + day.wind.speed + "m/h";
                    let humidity = document.createElement("p");
                    div.append(humidity)
                    humidity.textContent = "Humidity: " + day.main.humidity + "%";
                    container.append(wrapper);
                }
            });
            console.log(icon);
        }