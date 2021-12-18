//variables
var cityFormEl = $('#city-form');
var cityList = $('.city-list');


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

}
cityFormEl.on('submit', searchCity);