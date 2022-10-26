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
var iconSymbol;
var storedSearchesArray = [];
var date;
var weatherIcon;
var temperature;
var windSpeed;
var humidityPercent;
var date1;
var weatherIcon1;
var weatherIconImage1;
var temperature1;
var windSpeed1;
var humidityPercent1;
var date2;
var weatherIcon2;
var weatherIconImage2;
var temperature2;
var windSpeed2;
var humidityPercent2;
var date3;
var weatherIcon3;
var weatherIconImage3;
var temperature3;
var windSpeed3;
var humidityPercent3;
var date4;
var weatherIcon4;
var weatherIconImage4;
var temperature4;
var windSpeed4;
var humidityPercent4;
var date5;
var weatherIcon5;
var weatherIconImage5;
var temperature5;
var windSpeed5;
var humidityPercent5;
// Other Variables
var storedSearchesButton;
// Result Variables
var weatherIconImage;
var jumboDisplayLine1;
var jumboDisplayIconLine;
var jumboDisplayIconImage;
var jumboDisplayLine2;
var jumboDisplayLine3;
var jumboDisplayLine4;
var displayDate1;
var displayWeatherIcon1;
var displayTemperature1;
var displayWindSpeed1;
var displayHumidityPercent1;
var displayDate2;
var displayWeatherIcon2;
var displayTemperature2;
var displayWindSpeed2;
var displayHumidityPercent2;
var displayDate3;
var displayWeatherIcon3;
var displayTemperature3;
var displayWindSpeed3;
var displayHumidityPercent3;
var displayDate4;
var displayWeatherIcon4;
var displayTemperature4;
var displayWindSpeed4;
var displayHumidityPercent4;
var displayDate5;
var displayWeatherIcon5;
var displayTemperature5;
var displayWindSpeed5;
var displayHumidityPercent5;

// Functions

// Get the latitude and longitude of the searched location
function getGeocodingResults() {
    searchPlace = searchInput.val();
    var getLatAndLonURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchPlace + '&appid=' + APIKey;
    fetch(getLatAndLonURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            latitude = data[0].lat;
            longitude = data[0].lon;
            cityName = data[0].name;

        })
        // Run the remaining search functions
        .then (storeSearches) // Not Working Properly
        .then (displayStoredSearches) // Not Working Properly
        .then (getWeatherForecast)
}

// Save the searched location - Not Working Properly
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

// Display previously searched locations as clickable buttons - Not Working Properly
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
            // Display the 5 day forecast
            // Day 1
            date1 = data.list[1 * 8 - 1].dt_txt; //with assisteance from AskBCS
            weatherIcon1 = data.list[1 * 8 - 1].weather[0].icon;
            
            if (weatherIcon1 === '01d') {
                iconSymbol = './assets/images/01d@2x.png'
            } else if (weatherIcon1 === '01n') {
                iconSymbol = './assets/images/01n@2x.png'
            } else if (weatherIcon1 === '02d') {
                iconSymbol = './assets/images/02d@2x.png'
            } else if (weatherIcon1 === '02n') {
                iconSymbol = './assets/images/02n@2x.png'
            } else if (weatherIcon1 === '03d' || weatherIcon1 === '03n') {
                iconSymbol = './assets/images/03d@2x.png'
            } else if (weatherIcon1 === '04d' || weatherIcon1 === '04n') {
                iconSymbol = './assets/images/04d@2x.png'
            } else if (weatherIcon1 === '09d' || weatherIcon1 === '09n') {
                iconSymbol = './assets/images/09d@2x.png'
            } else if (weatherIcon1 === '10d') {
                iconSymbol = './assets/images/10d@2x.png'
            } else if (weatherIcon1 === '10n') {
                iconSymbol = './assets/images/10n@2x.png'
            } else if (weatherIcon1 === '11d' || weatherIcon1 === '11n') {
                iconSymbol = './assets/images/11d@2x.png'
            } else if (weatherIcon1 === '13d' || weatherIcon1 === '13n') {
                iconSymbol = './assets/images/13d@2x.png'
            } else if (weatherIcon1 === '50d' || weatherIcon1 === '50n') {
                iconSymbol = './assets/images/50d@2x.png'
            }

            temperature1 = data.list[1 * 8 - 1].main.temp;
            windSpeed1 = data.list[1 * 8 - 1].wind.speed;
            humidityPercent1 = data.list[1 * 8 - 1].main.humidity;
            displayDate1 = document.createElement('li');
            displayDate1.textContent = date1;
            displayWeatherIcon1 = document.createElement('li');
            weatherIconImage1 = document.createElement('img')
            $(weatherIconImage1).attr('src', iconSymbol)
            displayWeatherIcon1.append(weatherIconImage1)
            displayTemperature1 = document.createElement('li');
            displayTemperature1.textContent = 'Temp: ' + temperature1 + '°F';
            displayWindSpeed1 = document.createElement('li');
            displayWindSpeed1.textContent = 'Wind: ' + windSpeed1 + ' MPH';
            displayHumidityPercent1 = document.createElement('li');
            displayHumidityPercent1.textContent = 'Humidity: ' + humidityPercent1 + '%';
            forecastDay1.append(displayDate1);
            forecastDay1.append(displayWeatherIcon1);
            forecastDay1.append(displayTemperature1);
            forecastDay1.append(displayWindSpeed1);
            forecastDay1.append(displayHumidityPercent1); 
            // Day 2
            date2 = data.list[2 * 8 - 1].dt_txt; //with assisteance from AskBCS
            weatherIcon2 = data.list[2 * 8 - 1].weather[0].icon;
            
            if (weatherIcon2 === '01d') {
                iconSymbol = './assets/images/01d@2x.png'
            } else if (weatherIcon2 === '01n') {
                iconSymbol = './assets/images/01n@2x.png'
            } else if (weatherIcon2 === '02d') {
                iconSymbol = './assets/images/02d@2x.png'
            } else if (weatherIcon2 === '02n') {
                iconSymbol = './assets/images/02n@2x.png'
            } else if (weatherIcon2 === '03d' || weatherIcon2 === '03n') {
                iconSymbol = './assets/images/03d@2x.png'
            } else if (weatherIcon2 === '04d' || weatherIcon2 === '04n') {
                iconSymbol = './assets/images/04d@2x.png'
            } else if (weatherIcon2 === '09d' || weatherIcon2 === '09n') {
                iconSymbol = './assets/images/09d@2x.png'
            } else if (weatherIcon2 === '10d') {
                iconSymbol = './assets/images/10d@2x.png'
            } else if (weatherIcon2 === '10n') {
                iconSymbol = './assets/images/10n@2x.png'
            } else if (weatherIcon2 === '11d' || weatherIcon2 === '11n') {
                iconSymbol = './assets/images/11d@2x.png'
            } else if (weatherIcon2 === '13d' || weatherIcon2 === '13n') {
                iconSymbol = './assets/images/13d@2x.png'
            } else if (weatherIcon2 === '50d' || weatherIcon2 === '50n') {
                iconSymbol = './assets/images/50d@2x.png'
            }

            temperature2 = data.list[2 * 8 - 1].main.temp;
            windSpeed2 = data.list[2 * 8 - 1].wind.speed;
            humidityPercent2 = data.list[2 * 8 - 1].main.humidity;
            displayDate2 = document.createElement('li');
            displayDate2.textContent = date2;
            displayWeatherIcon2 = document.createElement('li');
            weatherIconImage2 = document.createElement('img')
            $(weatherIconImage2).attr('src', iconSymbol)
            displayWeatherIcon2.append(weatherIconImage2)
            displayTemperature2 = document.createElement('li');
            displayTemperature2.textContent = 'Temp: ' + temperature2 + '°F';
            displayWindSpeed2 = document.createElement('li');
            displayWindSpeed2.textContent = 'Wind: ' + windSpeed2 + ' MPH';
            displayHumidityPercent2 = document.createElement('li');
            displayHumidityPercent2.textContent = 'Humidity: ' + humidityPercent2 + '%';
            forecastDay2.append(displayDate2);
            forecastDay2.append(displayWeatherIcon2);
            forecastDay2.append(displayTemperature2);
            forecastDay2.append(displayWindSpeed2);
            forecastDay2.append(displayHumidityPercent2); 
            // Day 3
            date3 = data.list[3 * 8 - 1].dt_txt; //with assisteance from AskBCS
            weatherIcon3 = data.list[3 * 8 - 1].weather[0].icon;
            
            if (weatherIcon3 === '01d') {
                iconSymbol = './assets/images/01d@2x.png'
            } else if (weatherIcon3 === '01n') {
                iconSymbol = './assets/images/01n@2x.png'
            } else if (weatherIcon3 === '02d') {
                iconSymbol = './assets/images/02d@2x.png'
            } else if (weatherIcon3 === '02n') {
                iconSymbol = './assets/images/02n@2x.png'
            } else if (weatherIcon3 === '03d' || weatherIcon3 === '03n') {
                iconSymbol = './assets/images/03d@2x.png'
            } else if (weatherIcon3 === '04d' || weatherIcon3 === '04n') {
                iconSymbol = './assets/images/04d@2x.png'
            } else if (weatherIcon3 === '09d' || weatherIcon3 === '09n') {
                iconSymbol = './assets/images/09d@2x.png'
            } else if (weatherIcon3 === '10d') {
                iconSymbol = './assets/images/10d@2x.png'
            } else if (weatherIcon3 === '10n') {
                iconSymbol = './assets/images/10n@2x.png'
            } else if (weatherIcon3 === '11d' || weatherIcon3 === '11n') {
                iconSymbol = './assets/images/11d@2x.png'
            } else if (weatherIcon3 === '13d' || weatherIcon3 === '13n') {
                iconSymbol = './assets/images/13d@2x.png'
            } else if (weatherIcon3 === '50d' || weatherIcon3 === '50n') {
                iconSymbol = './assets/images/50d@2x.png'
            }

            temperature3 = data.list[3 * 8 - 1].main.temp;
            windSpeed3 = data.list[3 * 8 - 1].wind.speed;
            humidityPercent3 = data.list[3 * 8 - 1].main.humidity;
            displayDate3 = document.createElement('li');
            displayDate3.textContent = date3;
            displayWeatherIcon3 = document.createElement('li');
            weatherIconImage3 = document.createElement('img')
            $(weatherIconImage3).attr('src', iconSymbol)
            displayWeatherIcon3.append(weatherIconImage3)
            displayTemperature3 = document.createElement('li');
            displayTemperature3.textContent = 'Temp: ' + temperature3 + '°F';
            displayWindSpeed3 = document.createElement('li');
            displayWindSpeed3.textContent = 'Wind: ' + windSpeed3 + ' MPH';
            displayHumidityPercent3 = document.createElement('li');
            displayHumidityPercent3.textContent = 'Humidity: ' + humidityPercent3 + '%';
            forecastDay3.append(displayDate3);
            forecastDay3.append(displayWeatherIcon3);
            forecastDay3.append(displayTemperature3);
            forecastDay3.append(displayWindSpeed3);
            forecastDay3.append(displayHumidityPercent3); 
            // Day 4
            date4 = data.list[4 * 8 - 1].dt_txt; //with assisteance from AskBCS
            weatherIcon4 = data.list[4 * 8 - 1].weather[0].icon;
            
            if (weatherIcon4 === '01d') {
                iconSymbol = './assets/images/01d@2x.png'
            } else if (weatherIcon4 === '01n') {
                iconSymbol = './assets/images/01n@2x.png'
            } else if (weatherIcon4 === '02d') {
                iconSymbol = './assets/images/02d@2x.png'
            } else if (weatherIcon4 === '02n') {
                iconSymbol = './assets/images/02n@2x.png'
            } else if (weatherIcon4 === '03d' || weatherIcon4 === '03n') {
                iconSymbol = './assets/images/03d@2x.png'
            } else if (weatherIcon4 === '04d' || weatherIcon4 === '04n') {
                iconSymbol = './assets/images/04d@2x.png'
            } else if (weatherIcon4 === '09d' || weatherIcon4 === '09n') {
                iconSymbol = './assets/images/09d@2x.png'
            } else if (weatherIcon4 === '10d') {
                iconSymbol = './assets/images/10d@2x.png'
            } else if (weatherIcon4 === '10n') {
                iconSymbol = './assets/images/10n@2x.png'
            } else if (weatherIcon4 === '11d' || weatherIcon4 === '11n') {
                iconSymbol = './assets/images/11d@2x.png'
            } else if (weatherIcon4 === '13d' || weatherIcon4 === '13n') {
                iconSymbol = './assets/images/13d@2x.png'
            } else if (weatherIcon4 === '50d' || weatherIcon4 === '50n') {
                iconSymbol = './assets/images/50d@2x.png'
            }

            temperature4 = data.list[4 * 8 - 1].main.temp;
            windSpeed4 = data.list[4 * 8 - 1].wind.speed;
            humidityPercent4 = data.list[4 * 8 - 1].main.humidity;
            displayDate4 = document.createElement('li');
            displayDate4.textContent = date4;
            displayWeatherIcon4 = document.createElement('li');
            weatherIconImage4 = document.createElement('img')
            $(weatherIconImage4).attr('src', iconSymbol)
            displayWeatherIcon4.append(weatherIconImage4)
            displayTemperature4 = document.createElement('li');
            displayTemperature4.textContent = 'Temp: ' + temperature4 + '°F';
            displayWindSpeed4 = document.createElement('li');
            displayWindSpeed4.textContent = 'Wind: ' + windSpeed4 + ' MPH';
            displayHumidityPercent4 = document.createElement('li');
            displayHumidityPercent4.textContent = 'Humidity: ' + humidityPercent4 + '%';
            forecastDay4.append(displayDate4);
            forecastDay4.append(displayWeatherIcon4);
            forecastDay4.append(displayTemperature4);
            forecastDay4.append(displayWindSpeed4);
            forecastDay4.append(displayHumidityPercent4); 
            // Day 5
            date5 = data.list[5 * 8 - 1].dt_txt; //with assisteance from AskBCS
            weatherIcon5 = data.list[5 * 8 - 1].weather[0].icon;
            
            if (weatherIcon5 === '01d') {
                iconSymbol = './assets/images/01d@2x.png'
            } else if (weatherIcon5 === '01n') {
                iconSymbol = './assets/images/01n@2x.png'
            } else if (weatherIcon5 === '02d') {
                iconSymbol = './assets/images/02d@2x.png'
            } else if (weatherIcon5 === '02n') {
                iconSymbol = './assets/images/02n@2x.png'
            } else if (weatherIcon5 === '03d' || weatherIcon5 === '03n') {
                iconSymbol = './assets/images/03d@2x.png'
            } else if (weatherIcon5 === '04d' || weatherIcon5 === '04n') {
                iconSymbol = './assets/images/04d@2x.png'
            } else if (weatherIcon5 === '09d' || weatherIcon5 === '09n') {
                iconSymbol = './assets/images/09d@2x.png'
            } else if (weatherIcon5 === '10d') {
                iconSymbol = './assets/images/10d@2x.png'
            } else if (weatherIcon5 === '10n') {
                iconSymbol = './assets/images/10n@2x.png'
            } else if (weatherIcon5 === '11d' || weatherIcon5 === '11n') {
                iconSymbol = './assets/images/11d@2x.png'
            } else if (weatherIcon5 === '13d' || weatherIcon5 === '13n') {
                iconSymbol = './assets/images/13d@2x.png'
            } else if (weatherIcon5 === '50d' || weatherIcon5 === '50n') {
                iconSymbol = './assets/images/50d@2x.png'
            }

            temperature5 = data.list[5 * 8 - 1].main.temp;
            windSpeed5 = data.list[5 * 8 - 1].wind.speed;
            humidityPercent5 = data.list[5 * 8 - 1].main.humidity;
            displayDate5 = document.createElement('li');
            displayDate5.textContent = date5;
            displayWeatherIcon5 = document.createElement('li');
            weatherIconImage5 = document.createElement('img')
            $(weatherIconImage5).attr('src', iconSymbol)
            displayWeatherIcon5.append(weatherIconImage5)
            displayTemperature5 = document.createElement('li');
            displayTemperature5.textContent = 'Temp: ' + temperature5 + '°F';
            displayWindSpeed5 = document.createElement('li');
            displayWindSpeed5.textContent = 'Wind: ' + windSpeed5 + ' MPH';
            displayHumidityPercent5 = document.createElement('li');
            displayHumidityPercent5.textContent = 'Humidity: ' + humidityPercent5 + '%';
            forecastDay5.append(displayDate5);
            forecastDay5.append(displayWeatherIcon5);
            forecastDay5.append(displayTemperature5);
            forecastDay5.append(displayWindSpeed5);
            forecastDay5.append(displayHumidityPercent5); 
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
    if (jumboDisplayIconLine) {
        jumboDisplayIconLine.innerHTML = '';
        jumboDisplayLine1.innerHTML = '';
        jumboDisplayIconImage.innerHTML = '';
        jumboDisplayLine2.innerHTML = '';
        jumboDisplayLine3.innerHTML = '';
        jumboDisplayLine4.innerHTML = '';
        // 1
        weatherIconImage1.innerHTML = '';
        displayDate1.innerHTML = '';
        displayWeatherIcon1.innerHTML = '';
        displayTemperature1.innerHTML = '';
        displayWindSpeed1.innerHTML = '';
        displayHumidityPercent1.innerHTML = '';
        // 2
        displayWeatherIcon2.innerHTML = '';
        displayDate2.innerHTML = '';
        displayWeatherIcon2.innerHTML = '';
        displayTemperature2.innerHTML = '';
        displayWindSpeed2.innerHTML = '';
        displayHumidityPercent2.innerHTML = '';
        // 3
        displayWeatherIcon3.innerHTML = '';
        displayDate3.innerHTML = '';
        displayWeatherIcon3.innerHTML = '';
        displayTemperature3.innerHTML = '';
        displayWindSpeed3.innerHTML = '';
        displayHumidityPercent3.innerHTML = '';
        // 4
        displayWeatherIcon4.innerHTML = '';
        displayDate4.innerHTML = '';
        displayWeatherIcon4.innerHTML = '';
        displayTemperature4.innerHTML = '';
        displayWindSpeed4.innerHTML = '';
        displayHumidityPercent4.innerHTML = '';
        // 5
        displayWeatherIcon5.innerHTML = '';
        displayDate5.innerHTML = '';
        displayWeatherIcon5.innerHTML = '';
        displayTemperature5.innerHTML = '';
        displayWindSpeed5.innerHTML = '';
        displayHumidityPercent5.innerHTML = '';
    }
}
// Performs the search
var runSearch = function(event) {
    event.preventDefault();
    clearPreviousResults();
    getGeocodingResults();
}
// Initial page set-up - Not Working
function init() {
    displayStoredSearches();
}


// Event Listeners
searchForm.on('submit', runSearch);
// when stored search buttons are clicked
// storedSearchesButton.on('click', getWeatherForecast);

// Called on page load
init();
