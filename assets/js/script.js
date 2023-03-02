var weatherAPIKey = "92ac65368ccc7477640749d69fd94759";
var searchBar = $("#searchBar");
var searchBtn = $("#searchBtn");
var lat
var long

$(searchBtn).on("click", function(){
    var city = searchBar.val()

    // we'll call all three functions
    getGeolocation(city)
    getWeather()

})

// a function that gets the geolocation
function getGeolocation(cityName) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${weatherAPIKey}`)
        .then(data => {
            lat = data[0].lat
            long = data[0].lon
        })
}

// a function that gets the weather info based of the geo

// a function that does a loop and creates elements to show each day
// for each day
// get the weather info and paint the page



//showing the list of saved cities
// for (let i = 0; i < scores.length; i++) {
//     var li = document.createElement("li");
//     li.textContent = scores[i];
//     li.setAttribute("data-index", i);
//       var highScoresList = document.getElementById("highscores-list")
//     location.href = "highscores.html";
//     highScoresList.appendChild(li);
//   }