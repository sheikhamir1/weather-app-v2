// all selected elements
const form = document.querySelector(".weather__search");
const celsius = document.querySelector(".c");
const farenheit = document.querySelector(".f");
const city = document.querySelector(".weather__city");
const country = document.querySelector(".weather__country");
const dateTime = document.querySelector(".weather__datetime");
const weatherIcon = document.querySelector(".weather__icon");
const weatherforecast = document.querySelector(".weather__forecast");
const min = document.querySelector(".min");
const max = document.querySelector(".max");
const realfeel = document.querySelector(".realfeel");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const pressure = document.querySelector(".pressure");
const Gust_wind = document.querySelector(".Gust_wind");
const vis_km = document.querySelector(".vis_km");
const sun_Raise = document.querySelector(".sun_Raise");
const Sunset = document.querySelector(".Sunset");
const region = document.querySelector(".region");

//  hide elements
const weather_units = document.querySelector(".weather__units");
const outer_div = document.querySelector(".outer_div");
outer_div.style.display = "none";
weather_units.style.display = "none";

//  delete elements
const weather_title = document.querySelector(".weather__title");

// controlling form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const search = document.querySelector(".weather__searchform").value;

  // passing search value and start fetching
  if (search) {
    weather3(search);
    weather_title.remove();
    outer_div.style.display = "block";
    weather_units.style.display = "block";

    document.querySelector(".weather__searchform").value = "";
  }
});

// weather3 first api call
const weather3 = async (cityData) => {
  const weather = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=c7c33e6fcbee4bbd80560617240805&q=${cityData}&days=1&aqi=yes&alerts=yes`
  );
  const response = await weather.json();
  const data = response;

  // use console here for debugging
  // console.log(data);

  // setting values
  celsius.innerHTML = data.current.temp_c;
  farenheit.innerHTML = data.current.temp_f;
  city.innerHTML = data.location.name;
  dateTime.innerHTML = data.location.localtime;
  country.innerHTML = data.location.country;
  realfeel.innerHTML = data.current.feelslike_c;
  humidity.innerHTML = data.current.humidity;
  pressure.innerHTML = data.current.pressure_in;
  Gust_wind.innerHTML = data.current.gust_kph;
  vis_km.innerHTML = data.current.vis_km;
  sun_Raise.innerHTML = data.forecast.forecastday[0].astro.sunrise;
  Sunset.innerHTML = data.forecast.forecastday[0].astro.sunset;
  region.innerHTML = ` , ${data.location.region}`;

  // extracting longitude and latitude
  longitude = data.location.lon;
  latitude = data.location.lat;
  longitude_and_latitude(longitude, latitude);
};

// fetching longitude and latitude
function longitude_and_latitude(longitude, latitude) {
  // check for debugging
  // console.log(`this is working ${longitude} ${latitude}`);

  // calling weather function with longitude and latitude
  weather(longitude, latitude);
}

// weather second api call
const weather = async (longitude, latitude) => {
  const weather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=6b556005dae9d19ffd7918ac69d92c9f`
  );
  const response = await weather.json();
  const data = response;

  // use console here for debugging
  // console.log(data);

  // adding <img>
  const img = document.createElement("img");
  img.classList.add("myImg");
  img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherIcon.innerHTML = "";
  weatherIcon.appendChild(img);

  // sitting values
  weatherforecast.innerHTML = data.weather[0].description;
  const maxTep = (max.innerHTML = data.main.temp_max);
  const minTep = (min.innerHTML = data.main.temp_min);

  // convert temperature from Kelvin to Celsius
  const new_max = maxTep - 273.15;
  const Maximum = new_max.toFixed(2);
  max.innerHTML = Maximum;
  const new_min = minTep - 273.15;
  const Minimum = new_min.toFixed(2);
  min.innerHTML = Minimum;
  wind.innerHTML = data.wind.speed;
};
