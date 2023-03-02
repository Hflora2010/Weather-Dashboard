var weatherAPIKey = "92ac65368ccc7477640749d69fd94759";
var searchBar = $("#search-bar");
var searchBtn = $("#search-button");

var lat;
var long;
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

// a function that gets the geolocation
function getGeolocation(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKey}&units=imperial`) //imperial is converting to fahrenheit 
    .then(response => response.json())
        .then(data => {data.main.temp
// console.log(data);
// console.log(data.main.temp);
        })
}

// a function that gets the weather info based of the geo
function getGeoWeather() {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}`)
        .then(data => {
            // id = data[1].id
            // temp = data[2].temp
            // windSpeed = data[4].speed

        })
}

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