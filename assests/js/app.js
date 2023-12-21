const api = "fa0b6ea4253b5b114a91a3a4bf1293ec";

class Forecast{
  constructor (date,icon,temp,wind,humidity){
    this.date = date;
    this.icon = icon;
    this.temp = temp;
    this.wind = wind;
    this.humidity = humidity;
  }
}

$('#search-button').on('click', function (event) {
  event.preventDefault()
  var cityLocation = $('#search-input').val();
  var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityLocation + "&appid=" + api+"&units=metric";



  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      console.log(data)

     var date = data.list[0].dt_txt.split(' ')[0]
     var icon = data.list[0].weather[0].icon
     var temp = data.list[0].main.temp
     var wind = data.list[0].wind.speed
     var humidity = data.list[0].main.humidity
    
     var forecasts = [];
     for(let i=0;i<data.list.length;i++){
      var date = data.list[i].dt_txt.split(' ')[0]
      var icon = data.list[i].weather[0].icon
      var temp = data.list[i].main.temp
      var wind = data.list[i].wind.speed
      var humidity = data.list[i].main.humidity

      forecasts.push(new Forecast(date,icon,temp,wind,humidity))
      var card = document.createElement("div");
      card.className= "col-lg-4 col-12 mb-4 cd";
      card.innerHTML= `
      <div class= "card">
      <div class="card-body">
      <h2 class="card-title text">${date}</h2>
      <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
      <p class="card-text text"> Temperature: ${temp}°C</p>
      <p class="card-text text"> Wind speed: ${wind} KPH</p>
      <p class="card-text text"> Humidity: ${humidity}%</p>
      </div>
      </div>
      `;
      var forecastContainer = document.getElementById("forcast-container");
      if(forecastContainer){
        forecastContainer.appendChild(card)
      }
     }



    })
});

let cityList = []
function getInput() {
  $('#search-button').on('click', function (event) {
    event.preventDefault()
    const city = $('#search-input').val();
    // console.log(city)
    cityList.push(city)
    renderInput()
    storeCityLsit()
  })


}
getInput()
function renderInput(city) {
  $('ul').empty()
  for (var i = 0; i < cityList.length; i++) {
    const cityEL = $('<li>').text(cityList[i]).addClass('list-item-group city');
    $('ul').append(cityEL);

    cityEL.on('click', function () {
      var cityName = $(this).text();
      cityList.push(cityName);


     
    });

  }

  storeCityLsit();

}
function storeCityLsit() {
  localStorage.setItem('city-names', JSON.stringify(cityList));
}

// function loadCityList() {
//   const storedCityList = localStorage.getItem('city-names');
//   if (storedCityList) {
//     cityList = JSON.parse(storedCityList);
//   }
// }

// Load the city list on page load
// loadCityList();

// Initialize the event listener for the search button
getInput();
// dsiplay city names when submit box is clicked
// grab city name from submit
// have an array where we can push the city name in
// grab all city name to add to elements in page
