
var currentTime = dayjs().format('MMMM D, YYYY h:mm A')
var cityName = "";
var cityInput = document.getElementById('cityInput')
var searchBtn = document.getElementById('searchBtn');
var chosenCityName = document.getElementById('currentName');
var chosenCityDate = document.getElementById('currentDate')
var chosenCityTemp = document.getElementById('currentTemp');
var chosenCityHumidity = document.getElementById('currentHumidity');
var chosenCityWindSpeed = document.getElementById('currentWindSpeed');
var dayOneDate = document.getElementById('dayOneDate')
var dayOneIcon = document.getElementById('dayOneIcon')
var dayOneTemp = document.getElementById('dayOneTemp')
var dayOneHumidity = document.getElementById('dayOneHumidity')
var dayOneWindSpeed = document.getElementById('dayOneWindSpeed')
var dayTwoDate = document.getElementById('dayTwoDate')
var dayTwoIcon = document.getElementById('dayTwoIcon')
var dayTwoTemp = document.getElementById('dayTwoTemp')
var dayTwoHumidity = document.getElementById('dayTwoHumidity')
var dayTwoWindSpeed = document.getElementById('dayTwoWindSpeed')
var dayThreeDate = document.getElementById('dayThreeDate')
var dayThreeIcon = document.getElementById('dayThreeIcon')
var dayThreeTemp = document.getElementById('dayThreeTemp')
var dayThreeHumidity = document.getElementById('dayThreeHumidity')
var dayThreeWindSpeed = document.getElementById('dayThreeWindSpeed')
var dayFourDate = document.getElementById('dayFourDate')
var dayFourIcon = document.getElementById('dayFourIcon')
var dayFourTemp = document.getElementById('dayFourTemp')
var dayFourHumidity = document.getElementById('dayFourHumidity')
var dayFourWindSpeed = document.getElementById('dayFourWindSpeed')
var dayFiveDate = document.getElementById('dayFiveDate')
var dayFiveIcon = document.getElementById('dayFiveIcon')
var dayFiveTemp = document.getElementById('dayFiveTemp')
var dayFiveHumidity = document.getElementById('dayFiveHumidity')
var dayFiveWindSpeed = document.getElementById('dayFiveWindSpeed')
var cityList = document.getElementById('cityList');
var searchedCities = [];
var fiveDayForecast = document.getElementById('fiveDayForecast');
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
var displayOld = function () {
  for(i=0; i<searchedCities.length; i++) {
    var cityBtn = document.createElement('button')
    cityBtn.textContent = searchedCities[i].city
    cityBtn.setAttribute('style', 'display: block')
    cityBtn.setAttribute('style', 'width: 100%')
    cityList.appendChild(cityBtn)
    cityBtn.addEventListener('click', function(event) {
      getLatLong(this.textContent)})
    }
}

//create 5 day cards


//fetch weather data for today
function fetchWeather(lat, long, cityName) {
  var weatherApiURL = 'https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=' + lat + '&lon=' + long + '&appid=' + apiKey;
  fetch(weatherApiURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data){
    chosenCityName.textContent = `${cityName}`
    chosenCityDate.textContent = `${dayjs().format('MMMM D')}`
    chosenCityTemp.textContent = `Temp: ${data.list[0].main.temp.toFixed(0)}°F`
    chosenCityHumidity.textContent = `Humidity: ${data.list[0].main.humidity}%`
    chosenCityWindSpeed.textContent = `Wind Speed: ${data.list[0].wind.speed.toFixed(0)}mph`
    var chosenCityIcon = document.createElement('img')
    chosenCityIcon.setAttribute('src', 'https://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '.png')
    chosenCityIcon.setAttribute('alt', 'icon that depicts the current weather conditions in the city chosen')
    chosenCityName.appendChild(chosenCityIcon)
  })
}

//fetch 5-day forcast and create cards
function fetchFiveDayForecast(lat, long) {
  var weatherApiURL = 'https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=' + lat + '&lon=' + long + '&appid=' + apiKey;
  fetch(weatherApiURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data){
    dayOneDate.textContent = dayjs.unix(data.list[2].dt).format('MMM D');
    dayOneIcon.setAttribute('src', 'https://openweathermap.org/img/wn/' + data.list[2].weather[0].icon + '.png')
    dayOneIcon.setAttribute('alt', 'icon that depicts the current weather conditions in the city chosen tomorrow') 
    dayOneTemp.textContent = `Temp: ${data.list[2].main.temp.toFixed(0)}°F`
    dayOneHumidity.textContent = `Humidity: ${data.list[2].main.humidity}%`
    dayOneWindSpeed.textContent = `Wind Speed: ${data.list[2].wind.speed.toFixed(0)}mph`
    dayTwoDate.textContent = dayjs.unix(data.list[10].dt).format('MMM D');
    dayTwoIcon.setAttribute('src', 'https://openweathermap.org/img/wn/' + data.list[10].weather[0].icon + '.png')
    dayTwoIcon.setAttribute('alt', 'icon that depicts the current weather conditions in the city chosen the day after tomorrow') 
    dayTwoTemp.textContent = `Temp: ${data.list[10].main.temp.toFixed(0)}°F`
    dayTwoHumidity.textContent = `Humidity: ${data.list[10].main.humidity}%`
    dayTwoWindSpeed.textContent = `Wind Speed: ${data.list[10].wind.speed.toFixed(0)}mph`
    dayThreeDate.textContent = dayjs.unix(data.list[20].dt).format('MMM D');
    dayThreeIcon.setAttribute('src', 'https://openweathermap.org/img/wn/' + data.list[20].weather[0].icon + '.png')
    dayThreeIcon.setAttribute('alt', 'icon that depicts the current weather conditions in the city chosen three days from now') 
    dayThreeTemp.textContent = `Temp: ${data.list[20].main.temp.toFixed(0)}°F`
    dayThreeHumidity.textContent = `Humidity: ${data.list[20].main.humidity}%`
    dayThreeWindSpeed.textContent = `Wind Speed: ${data.list[20].wind.speed.toFixed(0)}mph`
    dayFourDate.textContent = dayjs.unix(data.list[30].dt).format('MMM D');
    dayFourIcon.setAttribute('src', 'https://openweathermap.org/img/wn/' + data.list[30].weather[0].icon + '.png')
    dayFourIcon.setAttribute('alt', 'icon that depicts the current weather conditions in the city chosen four days from now') 
    dayFourTemp.textContent = `Temp: ${data.list[30].main.temp.toFixed(0)}°F`
    dayFourHumidity.textContent = `Humidity: ${data.list[30].main.humidity}%`
    dayFourWindSpeed.textContent = `Wind Speed: ${data.list[30].wind.speed.toFixed(0)}mph`
    dayFiveDate.textContent = dayjs.unix(data.list[39].dt).format('MMM D');
    dayFiveIcon.setAttribute('src', 'https://openweathermap.org/img/wn/' + data.list[39].weather[0].icon + '.png')
    dayFiveIcon.setAttribute('alt', 'icon that depicts the current weather conditions in the city chosen five days from now') 
    dayFiveTemp.textContent = `Temp: ${data.list[39].main.temp.toFixed(0)}°F`
    dayFiveHumidity.textContent = `Humidity: ${data.list[39].main.humidity}%`
    dayFiveWindSpeed.textContent = `Wind Speed: ${data.list[39].wind.speed.toFixed(0)}mph`
})
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
    var noDuplicates = searchedCities.findIndex(object => object.city === addedCity.city)
    if(noDuplicates === -1){
    //if not a duplicated, add to the searchedCities array, and make a new button
      searchedCities.push(addedCity)
      var newBtn = document.createElement('button')
      newBtn.textContent = addedCity.city
      newBtn.setAttribute('style', 'display: block')
      newBtn.setAttribute('style', 'width: 100%')
      cityList.appendChild(newBtn)
      newBtn.addEventListener('click', function(event) {
        getLatLong(this.textContent)})
    }
    
    //save to local storage
    localStorage.setItem("searchedCities", JSON.stringify(searchedCities))

    fetchWeather(lat, long, name);
    fetchFiveDayForecast(lat, long);
  })
}


displayClock()
displayOld()

searchBtn.addEventListener("click", function(event){
  event.preventDefault();
  var cityName = cityInput.value
  getLatLong(cityName)
})