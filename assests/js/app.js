const api = "fa0b6ea4253b5b114a91a3a4bf1293ec";
    var forecastContainer = document.getElementById("forcast-container");
class Forecast{
  constructor (date,icon,temp,wind,humidity){
    this.date = date;
    this.icon = icon;
    this.temp = temp;
    this.wind = wind;
    this.humidity = humidity;
  }
}
// $(".current-weather").hide();

$('#search-button').on('click',function(e){
  e.preventDefault()
  var cityLocation = $('#search-input').val();
  searchAPI(cityLocation)
  $(".current-weather").show();
} );
function searchAPI(cityLocation) {

  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityLocation + "&appid=" + api+"&units=metric";



  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      console.log(data)

     var currentdate = data.list[0].dt_txt.split(' ')[0]
     var currentIcon = data.list[0].weather[0].icon
     var currentTemp = data.list[0].main.temp
     var currentWind = data.list[0].wind.speed
     var currentHumidity = data.list[0].main.humidity
     var currentCity = data.city.name

    console.log(currentCity)

    document.getElementById("date").innerHTML=currentCity +" ("+currentdate+")"+ `<img src="https://openweathermap.org/img/wn/${currentIcon}.png" alt="Weather Icon">`
    document.getElementById("divTemp").textContent="Temp: "+currentTemp+" °C";
    document.getElementById("divWind").textContent="Wind Speed: "+currentWind+" KPH";
    document.getElementById("divHumidity").textContent="Humidity: "+currentHumidity+" %"



    forecastContainer.innerHTML = ""
     var forecasts = [];
     for(let i=7;i<data.list.length;i+=8){
      var date = data.list[i].dt_txt.split(' ')[0]
      var icon = data.list[i].weather[0].icon
      var temp = data.list[i].main.temp
      var wind = data.list[i].wind.speed
      var humidity = data.list[i].main.humidity

      forecasts.push(new Forecast(date,icon,temp,wind,humidity))
      var card = document.createElement("div");
      card.className= "col mw-15 mb-4 cd";
      card.innerHTML= `
      <div class= "card">
      <div class="card-body">
      <h2 class="card-title text">${date}</h2>
      <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
      <p class="card-text text"> Temperature: ${temp} °C</p>
      <p class="card-text text"> Wind speed: ${wind} KPH</p>
      <p class="card-text text"> Humidity: ${humidity} %</p>
      </div>
      </div>
      `;
  
      if(forecastContainer){
        forecastContainer.appendChild(card)
      }
     }



    })
}
let cityList = []
function getInput() {
  $('#search-button').on('click', function (event) {
    event.preventDefault()
    const city = $('#search-input').val();
    // console.log(city)
    storeCityLsit(city)
  })


}
function renderInput(city) {
  $('ul').empty()
  for (var i = 0; i < cityList.length; i++) {
    const cityEL = $('<li>').text(cityList[i]).addClass('list-item-group city');
    $('ul').append(cityEL);

    cityEL.on('click', function () {
      var cityName = $(this).text();
      storeCityLsit(cityName)
      searchAPI(cityName)
     
    });

  }


}
function storeCityLsit(cityName) {

  if(!cityList.includes(cityName)){
    cityList.push(cityName);
    if(cityList.length>5){
      cityList.shift()
    }
    }  
  localStorage.setItem('city-names', JSON.stringify(cityList));
  renderInput()

}

function loadCityList() {
  const storedCityList = localStorage.getItem('city-names');
  if (storedCityList) {
    cityList = JSON.parse(storedCityList);
  }
}

loadCityList();

getInput();

