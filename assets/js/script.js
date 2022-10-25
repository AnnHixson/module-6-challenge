// Variables
// Document Location Variables
var searchForm = $('#search-form');
var searchInput = $('#search-input');
var savedSearches = $('#saved-searches');
var forecastToday = $('#forecast-day-0');
// var forecastDay1 = $('#forecast-day-1');
// var forecastDay2 = $('#forecast-day-2');
// var forecastDay3 = $('#forecast-day-3');
// var forecastDay4 = $('#forecast-day-4');
// var forecastDay5 = $('#forecast-day-5');
// var forecastFor5Days = ["", forecastDay1, forecastDay2, forecastDay3, forecastDay4, forecastDay5]; //The blank first item of this array allows for the first data entry to be skipped in the 5 Day Forecast portion, so it can go in the jumbotron instead
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
var iconSymbol;
// Other Variables
var storedSearchesButton;
// testing
var jumboDisplayLine1;
var jumboDisplayIconLine;
var jumboDisplayIconImage;
var jumboDisplayLine2;
var jumboDisplayLine3;
var jumboDisplayLine4;
var displayDate;
var displayWeatherIcon;
                var weatherIconImage;
var displayTemperature;
var displayWindSpeed;
var displayHumidityPercent;

                // displayDate.innerHTML = '';
                // displayWeatherIcon.innerHTML = '';
                // displayTemperature.innerHTML = '';
                // displayWindSpeed.innerHTML = '';
                // displayHumidityPercent.innerHTML = '';

// var date1 = [''];
// var date2 = [''];
// var date3 = [''];
// var date4 = [''];
// var date5 = [''];
// var dateArray = ['', date1, date2, date3, date4, date5];



var weatherDay1 = $('#weather1');
var weatherDay2 = $('#weather2');
var weatherDay3 = $('#weather3');
var weatherDay4 = $('#weather4');
var weatherDay5 = $('#weather5');
var weatherFor5Days = ["", weatherDay1, weatherDay2, weatherDay3, weatherDay4, weatherDay5];

var forecastDay1;
var forecastDay2;
var forecastDay3;
var forecastDay4;
var forecastDay5;
var forecastFor5Days = ["", forecastDay1, forecastDay2, forecastDay3, forecastDay4, forecastDay5];
















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
            // Display the 5 day forecast
            // for (var i = 1; i < forecastFor5Days.length; i++) {
                for (var i = 1; i < 6; i++) {
                if (jumboDisplayIconLine) {
                //     displayDate.innerHTML = '';
                //     displayWeatherIcon.innerHTML = '';
                //     displayTemperature.innerHTML = '';
                //     displayWindSpeed.innerHTML = '';
                //     displayHumidityPercent.innerHTML = '';
                    forecastDay1.innerHTML = '';
                    forecastDay2.innerHTML = '';
                    forecastDay3.innerHTML = '';
                    forecastDay4.innerHTML = '';
                    forecastDay5.innerHTML = '';
                }
                date = data.list[i * 8 - 1].dt_txt; //with assisteance from AskBCS
                weatherIcon = data.list[i].weather[0].icon;
                displayIcon();
                temperature = data.list[i].main.temp;
                windSpeed = data.list[i].wind.speed;
                humidityPercent = data.list[i].main.humidity;
                displayDate = document.createElement('li');
                displayDate.textContent = date;
                displayWeatherIcon = document.createElement('li');
                weatherIconImage = document.createElement('img')
                $(weatherIconImage).attr('src', iconSymbol)
                displayWeatherIcon.append(weatherIconImage)
                // displayWeatherIcon.textContent = iconSymbol;
                displayTemperature = document.createElement('li');
                displayTemperature.textContent = 'Temp: ' + temperature + '°F';
                displayWindSpeed = document.createElement('li');
                displayWindSpeed.textContent = 'Wind: ' + windSpeed + ' MPH';
                displayHumidityPercent = document.createElement('li');
                displayHumidityPercent.textContent = 'Humidity: ' + humidityPercent + '%';   
                
                // dateArray[i].push(displayDate);


                // testDate = document.createElement('ui')

                forecastDay1 = document.createElement('ul');
                forecastDay2 = document.createElement('ul');
                forecastDay3 = document.createElement('ul');
                forecastDay4 = document.createElement('ul');
                forecastDay5 = document.createElement('ul');
                forecastFor5Days = ["", forecastDay1, forecastDay2, forecastDay3, forecastDay4, forecastDay5]



                weatherFor5Days[i].append(forecastFor5Days[i]);


                forecastFor5Days[i].append(displayDate);
                forecastFor5Days[i].append(displayWeatherIcon);
                forecastFor5Days[i].append(displayTemperature);
                forecastFor5Days[i].append(displayWindSpeed);
                forecastFor5Days[i].append(displayHumidityPercent);






                


                // displayDate.innerHTML = '';
                // displayWeatherIcon.innerHTML = '';
                // displayTemperature.innerHTML = '';
                // displayWindSpeed.innerHTML = '';
                // displayHumidityPercent.innerHTML = '';
            }
            // Display today's weather forecast in the jumbotron
            date = data.list[0].dt_txt;
            weatherIcon = data.list[0].weather[0].icon;
            displayIcon();
            temperature = data.list[0].main.temp;
            windSpeed = data.list[0].wind.speed;
            humidityPercent = data.list[0].main.humidity;
            jumboDisplayLine1 = document.createElement('li');
            jumboDisplayLine1.textContent = cityName + ' (' + date + ')';
            jumboDisplayIconLine = document.createElement('li');
            jumboDisplayIconImage = document.createElement('img')
            $(jumboDisplayIconImage).attr('src', iconSymbol)
            jumboDisplayIconLine.append(jumboDisplayIconImage)
            jumboDisplayLine2 = document.createElement('li');
            jumboDisplayLine2.textContent = 'Temp: ' + temperature + '°F';
            jumboDisplayLine3 = document.createElement('li');
            jumboDisplayLine3.textContent = 'Wind: ' + windSpeed + ' MPH';
            jumboDisplayLine4 = document.createElement('li');
            jumboDisplayLine4.textContent = 'Humidity: ' + humidityPercent + '%';
            forecastToday.append(jumboDisplayLine1);
            forecastToday.append(jumboDisplayIconLine)
            forecastToday.append(jumboDisplayLine2);
            forecastToday.append(jumboDisplayLine3);
            forecastToday.append(jumboDisplayLine4);
        })
}
// Display the weather forecast icon
function displayIcon() {
    if (weatherIcon === '01d') {
        iconSymbol = './assets/images/01d@2x.png'
    } else if (weatherIcon === '01n') {
        iconSymbol = './assets/images/01n@2x.png'
    } else if (weatherIcon === '02d') {
        iconSymbol = './assets/images/02d@2x.png'
    } else if (weatherIcon === '02n') {
        iconSymbol = './assets/images/02n@2x.png'
    } else if (weatherIcon === '03d' || weatherIcon === '03n') {
        iconSymbol = './assets/images/03d@2x.png'
    } else if (weatherIcon === '04d' || weatherIcon === '04n') {
        iconSymbol = './assets/images/04d@2x.png'
    } else if (weatherIcon === '09d' || weatherIcon === '09n') {
        iconSymbol = './assets/images/09d@2x.png'
    } else if (weatherIcon === '10d') {
        iconSymbol = './assets/images/10d@2x.png'
    } else if (weatherIcon === '10n') {
        iconSymbol = './assets/images/10n@2x.png'
    } else if (weatherIcon === '11d' || weatherIcon === '11n') {
        iconSymbol = './assets/images/11d@2x.png'
    } else if (weatherIcon === '13d' || weatherIcon === '13n') {
        iconSymbol = './assets/images/13d@2x.png'
    } else if (weatherIcon === '50d' || weatherIcon === '50n') {
        iconSymbol = './assets/images/50d@2x.png'
    }
}
function clearPreviousResults() {
    // date = '';
    // cityName = '';
    // weatherIcon = '';
    // temperature = '';
    // windSpeed = '';
    // humidityPercent = '';
    // forecastToday.remove();

    // for (var i = 0; i < forecastFor5Days.length; i++) {
    //         forecastFor5Days[i].innerHTML = '';
    //     };
}
// Performs the search
var runSearch = function(event) {
    event.preventDefault();
    // Clear previous results - not working
    if (jumboDisplayIconLine) {
        jumboDisplayIconLine.innerHTML = '';
        jumboDisplayLine1.innerHTML = '';
        jumboDisplayIconImage.innerHTML = '';
        jumboDisplayLine2.innerHTML = '';
        jumboDisplayLine3.innerHTML = '';
        jumboDisplayLine4.innerHTML = '';
        // displayDate.innerHTML = '';
        // displayWeatherIcon.innerHTML = '';
        // displayTemperature.innerHTML = '';
        // displayWindSpeed.innerHTML = '';
        // displayHumidityPercent.innerHTML = '';
        // for (var i = 1; i < dateArray.length; i++) {
            // dateArray[1][1].innerHTML = '';
            // console.log(dateArray[1][1]);
        //     // var clear5DayResults1 = forecastFor5Days[1].children('li')
        //     // clear5DayResults1.innerHTML = '';
        //     forecastFor5Days[i].removeChild('li');
        // //     displayDate.innerHTML = '';
        // //     displayWeatherIcon.innerHTML = '';
        // //     displayTemperature.innerHTML = '';
        // //     displayWindSpeed.innerHTML = '';
        // //     displayHumidityPercent.innerHTML = '';
        // }
    }
    // clearPreviousResults();
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
