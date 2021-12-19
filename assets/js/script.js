


//variables
var cityFormEl = $('#city-form');
var cityList = $('.city-list');
var currWeather = $('.current-w');
var apiKey = "1cfb34a53bf8b5e073240d3987394c4d";
var cards5 = $(".cards");
var tempArray = [];
var space = $(".space");



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
// space.hidden = false;
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
    currWeather.innerHTML = "";
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


   //logging current weather onto the page
   var currentTemp = data.current.temp;
        var temp = document.createElement('p');
        temp.textContent = 'Temperature (F): ' +currentTemp;
        currWeather.append(temp)
        console.log(temp)

     var currentWind = data.current.wind_speed;
        var wind = document.createElement('p');
        wind.textContent = 'Wind speed (mph): ' +currentWind;
        currWeather.append(wind)
        console.log(wind)

    var currentHumid = data.current.humidity;
        var humid = document.createElement('p');
        humid.textContent = 'Humidity: ' +currentHumid;
        currWeather.append(humid)
        console.log(humid)

    var currentUV = data.current.uvi;
        var uvi = document.createElement('p');
        // uvi.className = "uv-index"
        uvi.textContent = 'UV Index: ' +currentUV;
        currWeather.append(uvi)
        console.log(uvi)
        if (currentUV <= 2.99){
            uvi.classList.add("green");
        } else if (currentUV == 3-5.99) {
            uvi.classList.add("yellow")
        } else if (currentUV == 6-8){
            uvi.classList.add("orange")
    } else {
        uvi.classList.add("red")
    }
            


//    var array = []

//     array.push(currentTemp)
//     array.push(currentWind)
//     array.push(currentHumid)
//     array.push(currentUV)

//     console.log(array);
    

for (var i=0; i<5; i++) {
    var temp5 = data.daily[i].temp.day
    console.log(temp5)
    
    tempArray.push(temp5)
    console.log(tempArray)
}

    tempArray.each(function(value) {
        var temper = document.createElement('p');
        temper.textContent = 'Temperature (F): ' +value;
        console.log(temper)
        cards5.append(temper)
    })



    // var iconCode = forecast.weather[0].icon;
    // console.log(iconCode)   
    // var temp5 = forecast.temp.day;
    // console.log(temp5)
    // var humidity5 = forecast.humidity;
    // var windSpeed5 = forecast.wind_speed;

    // var iconurl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    //     $('#wicon').attr('src', iconurl)
    //     console.log(iconurl)
        
    //     var temper = document.createElement('p');
    //     temper.textContent = 'Temperature (F): ' +temp5;
    //     cards5.append(temper)
    
        
    //     var humi = document.createElement('p');
    //     humi.textContent = 'Humidity: ' +humidity5;
    //     cards5.append(humi)
    //     console.log(humi);


        
    //     var windy = document.createElement('p');
    //     windy.textContent = 'Wind speed (mph): ' +windSpeed5;
    //     cards5.append(windy)
    //     console.log(windy);



});
}







    



