//variables
var cityFormEl = $('.btn');
var cityList = $('#city-list');


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
        '<li class="flex-row justify-space-between align-center p-2 bg-light text-dark">'
        );

    cityNameEl.text(cityName);
    cityList.append(cityNameEl);

    // $('input[name="city-input"]').val('');

}
cityFormEl.on('click', searchCity);