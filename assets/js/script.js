// Variables
// Document Location Variables
var searchForm = $('#search-form');
var searchInput = $('#search-input');
var savedSearches = $('#saved-searches');
var forecastToday = $('#forecast-day-0');
var forecastDay1 = $('#forecast-day-1');
var forecastDay2 = $('#forecast-day-2');
var forecastDay3 = $('#forecast-day-3');
var forecastDay4 = $('#forecast-day-4');
var forecastDay5 = $('#forecast-day-5');
var forecastFor5Days = ["", forecastDay1, forecastDay2, forecastDay3, forecastDay4, forecastDay5]; //The blank first item of this array allows for the first data entry to be skipped in the 5 Day Forecast portion, so it can go in the jumbotron instead
// API Key Variable
var APIKey = "3b2c079221ed0780f8696a22bcc2d627";
// Geocoding Variables
var latitude;
var longitude;
// Search Variable
var searchPlace;
// Data Variables
var cityName;
var storedSearchesArray = [];
var date;
var weatherIcon;
var temperature;
var windSpeed;
var humidityPercent;
// Other Variables
var storedSearchesButton;

// Functions
// Get the latitude and longitude of the searched location
function getGeocodingResults() {
    searchPlace = searchInput.val();
    var getLatAndLonURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchPlace + '&appid=' + APIKey;
    fetch(getLatAndLonURL)
        .then(function (response) {
            // console.log("response", response);
            return response.json();
        })
        .then(function (data) {
            console.log("data", data);
            latitude = data[0].lat;
            longitude = data[0].lon;
            cityName = data[0].name;
            // console.log(latitude);
            // console.log(longitude);
        })
        // Run the remaining search functions
        .then (storeSearches)
        .then (displayStoredSearches)
        .then (getWeatherForecast)
}
// Save the searched location
function storeSearches() {
    var storedSearchEl = {
        "cityName": cityName,
        "latitude": latitude,
        "longitude": longitude
    };
    if (storedSearchesArray.includes(searchPlace)) {
        return;
    } else {
        storedSearchesArray.push(storedSearchEl);
        localStorage.setItem("storedSearchesArray", JSON.stringify(storedSearchesArray));
    }
}
// Display previously searched locations as clickable buttons
function displayStoredSearches() {
    for (var i = 0; i < storedSearchesArray.length; i++) {
        var storedSearchesButtonDisplay = storedSearchesArray[i];
        storedSearchesButtonDisplay.textContent = storedSearchesArray[i].cityName
        storedSearchesButton = document.createElement('button');
        storedSearchesButton.classList.add('mb-2', 'btn', 'btn-block', 'font-weight-bold');
        storedSearchesButton.innerHTML = storedSearchesButtonDisplay.textContent;
    }

        // storedSearchesButton.textContent = localStorage.getItem('storedSearchesArray')
        // storedSearchesButton.innerHTML = localStorage.getItem('storedSearchesArray')[i];
    
        savedSearches.append(storedSearchesButton);
}
// Get the weather forecast data
function getWeatherForecast() {
    var queryURL = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&units=imperial&appid=' + APIKey;
    fetch(queryURL)
        .then(function (response) {
            // console.log("response", response);
            return response.json();
        })
        .then(function (data) {
            console.log("data", data);
            for (var i = 1; i < forecastFor5Days.length; i++) {
                date = data.list[i].dt_txt;
                weatherIcon = data.list[i].weather[0].icon;
                temperature = data.list[i].main.temp;
                windSpeed = data.list[i].wind.speed;
                humidityPercent = data.list[i].main.humidity;
                var displayDate = document.createElement('li');
                displayDate.textContent = date;
                var displayWeatherIcon = document.createElement('li');
                displayWeatherIcon.textContent = weatherIcon;
                var displayTemperature = document.createElement('li');
                displayTemperature.textContent = temperature;
                var displayWindSpeed = document.createElement('li');
                displayWindSpeed.textContent = windSpeed;
                var displayHumidityPercent = document.createElement('li');
                displayHumidityPercent.textContent = humidityPercent;                
                forecastFor5Days[i].append(displayDate);
                forecastFor5Days[i].append(displayWeatherIcon);
                forecastFor5Days[i].append(displayTemperature);
                forecastFor5Days[i].append(displayWindSpeed);
                forecastFor5Days[i].append(displayHumidityPercent); 
            }
        })
        .then (displayWeatherForecast)
}
// Display the weather forecast data
function displayWeatherForecast() {

    console.log(cityName);
    console.log(date);
    console.log(weatherIcon);
    console.log(temperature);
    console.log(windSpeed);
    console.log(humidityPercent);

}
// Performs the search
var runSearch = function(event) {
    event.preventDefault();
    getGeocodingResults();
    // console.log(searchPlace);
}
// Initial page set-up
function init() {
    displayStoredSearches();
}


// Event Listeners
searchForm.on('submit', runSearch);
// when stored search buttons are clicked
// storedSearchesButton.on('click', getWeatherForecast);

// Called on page load
init();
