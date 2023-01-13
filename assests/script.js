
var currentTime = dayjs().format('MMMM D, YYYY h:mm A')
var cityName = "";
var cityInput = document.getElementById('cityInput')
var searchBtn = document.getElementById('searchBtn');
var chosenCityName = document.getElementById('currentName');
var chosenCityIcon = document.getElementById('currentIcon')
var chosenCityTemp = document.getElementById('currentTemp');
var chosenCityHumidity = document.getElementById('currentHumidity');
var chosenCityWindSpeed = document.getElementById('currentWindSpeed');
var cityList = document.getElementById('cityList');
var searchedCities = [];
var fiveDayForecast = document.getElementById('5dayForecast');
var apiKey = "a863505749c10d6c9a31806e96c0016f";
var lat= "";
var long= "";

// Display Current Date 
var displayClock = function () {
  var clock = document.getElementById('clock')
  clock.textContent= currentTime;  
}

//retrieve any local storage
var searchedCities = JSON.parse(localStorage.getItem('searchedCities')) ?? [];

//display old searches
var displayOld = function() {
  for(i=0; i<searchedCities.length; i++) {
    var cityBtn = document.createElement('button')
    cityBtn.textContent = searchedCities[i].city
    cityList.appendChild(cityBtn)
    cityBtn.addEventListener('click', function(event) {
      getLatLong(this.textContent)})
    }
  }
  
//fetch weather data for today
function fetchWeather(lat, long, cityName) {
  var weatherApiURL = 'https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=' + lat + '&lon=' + long + '&appid=' + apiKey;
  fetch(weatherApiURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data){
    chosenCityName.textContent = `${cityName}`
    chosenCityTemp.textContent = `Temp: ${data.list[0].main.temp.toFixed(0)}°F`
    chosenCityHumidity.textContent = `Humidity: ${data.list[0].main.humidity}%`
    chosenCityWindSpeed.textContent = `Wind Speed: ${data.list[0].wind.speed.toFixed(0)}mph`
    chosenCityIcon 
  })
}

//fetch 5-day forcast and create cards
function fiveDayForecast(){

}

//use Geocode to fetch coordinates for weather API
function getLatLong(name) {
  var geoApiURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + name + ',us&appid=' + apiKey
  fetch(geoApiURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var lat = data[0].lat;
    var long = data[0].lon;
    var name = data[0].name;
    
    var addedCity = {
      city: name,
      lat: lat,
      long: long,
    };
    //make sure no doubles exist
    var noDuplicates = searchedCities.findIndex(object => object.name === addedCity.name)
    if(noDuplicates === -1){
      searchedCities.push(addedCity)
      displayOld();
    }
    
    //save to local storage
    localStorage.setItem("searchedCities", JSON.stringify(searchedCities))

    fetchWeather(lat, long, name)
  })
}


displayClock()
displayOld()

searchBtn.addEventListener("click", function(event){
  event.preventDefault();
  var cityName = cityInput.value
  getLatLong(cityName)
})