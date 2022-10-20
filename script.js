
var APIKey = "3b2c079221ed0780f8696a22bcc2d627";

var searchForm = $('#search-form');
var searchInput = $('#search-input');
var searchButton = $('search-button')

var latitude;
var longitude;

var cityName;
var date;
var weatherIcon;
var temperature;
var windSpeed;
var humidityPercent;

var runSearch = function(event) {
    event.preventDefault();
    var searchPlace = searchInput.val();
    // console.log(searchPlace);
    var getLatAndLonURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchPlace + '&appid=' + APIKey;
    fetch(getLatAndLonURL)
        .then(function (response) {
            // console.log("response", response);
            return response.json();
        })
        .then(function (data) {
            console.log("data", data);
            for (var i = 0; i < data.length; i++) {
                latitude = data[i].lat;
                longitude = data[i].lon;
                // console.log(latitude);
                // console.log(longitude);
                var queryURL = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&units=imperial&appid=' + APIKey;
                fetch(queryURL)
                    .then(function (response) {
                        // console.log("response", response);
                        return response.json();
                    })
                    .then(function (data) {
                        console.log("data", data);
                        
                            cityName = data.city.name;
                            date = data.list[0].dt_txt;
                            weatherIcon = data.list[0].weather[0].icon;
                            temperature = data.list[0].main.temp;
                            windSpeed = data.list[0].wind.speed;
                            humidityPercent = data.list[0].main.humidity;

                        
                        displayResults();
                    })
            }
        })

}

function displayResults() {
    console.log(cityName);
    console.log(date);
    console.log(weatherIcon);
    console.log(temperature);
    console.log(windSpeed);
    console.log(humidityPercent);
}


searchForm.on('submit', runSearch);
