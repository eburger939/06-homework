


//variables
var cityFormEl = $('#city-form');
var cityList = $('.city-list');
var currWeather = $('.current-w');
var apiKey = "1cfb34a53bf8b5e073240d3987394c4d";
var cards = $(".cards");
var space = $(".space")



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
    //or say there is no click??
    if(!cityName) {
        alert("Please search by City name")
     return;
    }
 var cityNameEl = $(
        '<button class="cityBtn bg-dark bg-gradient text-white text-center w-100">'
        );
 cityNameEl.text(cityName);
//  cityNameEl.setAttribute("type", "submit")
cityList.append(cityNameEl);

$('input[name="city-input"]').val('');

var currentHeader = $('h2');
currentHeader.text("Displaying current weather for " +cityName +":");
currWeather.append(currentHeader);


// cityNameEl.on('click', searchApi)

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
    console.log(currentUV)
        var uvi = document.createElement('p');
        // uvi.className = "uv-index"
        uvi.textContent = 'UV Index: ' +currentUV;
        console.log(uvi)
        currWeather.append(uvi)
        if (currentUV <= 2.99){
            uvi.classList.add("green");
        } else if (currentUV == 3-5.99) {
            uvi.classList.add("yellow")
        } else if (currentUV == 6-8){
            uvi.classList.add("orange")
    } else {
        uvi.classList.add("red")
    }

        // currWeather.textContent = "";
    // currentTemp.textContent = ""
    // currentWind.textContent = ""
    // currentHumid.textContent = ""
    // currentUV.textContent = ""
dayForecast(data);

});
}           

var dayForecast = function (data) {
    cards.textContent = "";
for (var i=0; i<5; i++) {
    var forecast = data.daily[i]
    var temp5 = forecast.temp.day
    var humidity5 = forecast.humidity
    var windSpeed5 = forecast.wind_speed
    var iconCode = forecast.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    console.log(temp5)
    console.log(humidity5)
    console.log(windSpeed5)
    console.log(iconCode)


    var next = document.createElement('div')
    next.classList = "col d-flex"
    cards.append(next)

    var cardBody = document.createElement('div')
    cardBody.classList = "card-body"
    next.append(cardBody)

    // var cardHeader = document.createElement('h3')
    // var time= moment(forecast).format("DD-MM-YYY").add(5, 'days')
    // cardHeader.textContent = time
    // cardHeader.classList = "card-header text-center"
    // cardBody.appendChild(cardHeader)

    var icon = document.createElement('img')
    icon.classList = "icon"
    icon.setAttribute('src', iconurl)
    cardBody.append(icon)

    
    var te = document.createElement('p')
    // te.classList = "card-body"
    te.textContent = 'Temperature (F): ' +temp5;
    cardBody.append(te)
    console.log(te)


    var hum = document.createElement('p')
    // hum.classList = 'card-body text-center'
    hum.textContent = 'Humidity: ' +humidity5;
    cardBody.append(hum)
    console.log(hum)


    var win = document.createElement('p')
    // win.classList = 'card-body text-center'
    win.textContent = 'Wind Speed (mph): ' +windSpeed5;
    cardBody.append(win)
    console.log(win)

}
}



