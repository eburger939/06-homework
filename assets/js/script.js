


//variables
var cityFormEl = $('#city-form');
var cityList = $('.city-list');
var currWeather = $('.current-w');
var apiKey = "1cfb34a53bf8b5e073240d3987394c4d";



function displayCurrent(){
    var currentHeader = $('h2');
    currentHeader.text("Displaying current weather for" +cityName +":");
    currWeather.append(currentHeader);
}


//adding city names below in a list
function searchCity(event) {
    event.preventDefault();

    var cityName = $('input[name="city-input"]').val();
    console.log(cityName);
    if(!cityName) {
        alert("Please search by City name")
     return;
    }
 var cityNameEl = $(
        '<div class="bg-dark bg-gradient text-white text-center">'
        );
 cityNameEl.text(cityName);
cityList.append(cityNameEl);

$('input[name="city-input"]').val('');

var currentHeader = $('h2');
currentHeader.text("Displaying current weather for " +cityName +":");
currWeather.append(currentHeader);

searchApi(cityName);

}
cityFormEl.on('submit', searchCity);



function searchApi(cityName){
    var queryUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

    if (cityName) {
        queryUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey;
        console.log(queryUrl)
    } 

    fetch(queryUrl)
    .then(function (response) {
        if (!response.ok) {
        throw response.json();
        }
        console.log(response); 
        return response.json();
        
    })
        .then(function (data){
        console.log(data);

    var lat = data.coord.lat;
    var lon = data.coord.lon;
            console.log(lat);
            console.log(lon);  

    endApi(lat, lon);        
        });
    }

function endApi(lat, lon) {
    var completeQuery =  'https://api.openweathermap.org/data/2.5/onecall?lat=' +lat + '&lon=' +lon + '&exclude=hourly&units=imperial&appid=' + apiKey;

    fetch(completeQuery)
    .then(function (response){
        if (!response.ok) {
            throw response.json();
        }
        console.log(response);
        return response.json();
        })
        .then(function (data) {
            console.log(data);
    
    var currentTemp = data.current.temp;
    var currentWind = data.current.wind_speed;
    var currentHumid = data.current.humidity;
    var currentUV = data.current.uvi;

    console.log(currentTemp, currentWind, currentHumid, currentUV);

    });
}
