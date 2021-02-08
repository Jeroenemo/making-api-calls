import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// function convertKToF (temp) {
//   return 1.8 * (temp - 273) +32
// }
$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        console.log(response);
        getElements(response);
      }
    }

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      $(".celsius-btn").show();
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in Fahrenheit is ${(1.8 * (response.main.temp - 273) + 32).toFixed(2)} degrees.`);
      $('.showWeather').text(`The current weather condition is ${response.weather[0].description}! `)
      $('.showWind').text(`The wind speed is ${2.237 * (response.wind.speed)} MPH.`);

      $(".celsius-btn").click(() => {
        $(".fahrenheit-btn").show();
        $(".celsius-btn").hide();
        $('.showTemp').text(`The temperature in Celsius is ${(response.main.temp - 273).toFixed(2)} degrees.`);
      });
  
      $(".fahrenheit-btn").click(() => {
        $(".celsius-btn").show();
        $(".fahrenheit-btn").hide();
        $('.showTemp').text(`The temperature in Fahrenheit is ${(1.8 * (response.main.temp - 273) + 32).toFixed(2)} degrees.`);
      });
    }
  });
});