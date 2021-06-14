const { default: gulpfile } = require("../gulpfile");

const apiKey = 'cc42663f6c57ef798f9e29193e9b86f4';
const baseUrl = 'https://api.openweathermap.org/data/2.5/';
const unitsParam = 'units=metric';

const getFiveDay = async (lat, lon) => {
  const response = await fetch(
    `${baseUrl}forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&${unitsParam}`
  );
  const data = await response.json();
  return data;
};

const getCurrentWeather = async (lat, lon) => {
  const response = await fetch(
    `${baseUrl}weather?lat=${lat}&lon=${lon}&appid=${apiKey}&${unitsParam}`
  );
  const data = await response.json();
  return data;
};

const currentCond = (conditions) => {
  const currentCondElem = document.querySelector(
    '.current-conditions'
  );
  currentCondElem.innerHTML = '';
  const htmlString = `
  <h2>Current Conditions</h2>
  <img src="http://openweathermap.org/img/wn/${conditions.iconId}@2x.png" />
  <div class="current">
    <div class="temp">${conditions.temperature}℃</div>
    <div class="condition">${conditions.description}</div>
  </div>
  `;

  currentCondElem.insertAdjacentHTML('beforeend', htmlString);
};

const dayHTML = (dayCond) => {
  return `
  <div class="day">
    <h3>${dayCond.name}</h3>
    <img src="http://openweathermap.org/img/wn/${dayCond.iconId}@2x.png" />
    <div class="description">${dayCond.description}</div>
    <div class="temp">
      <span class="high">${dayCond.highTemp}℃</span>/<span class="low">${dayCond.lowTemp}℃</span>
    </div>
  </div>
  `;
};

const dayForcastelem = (dayObject) => {
  const forecastElem = document.querySelector('.forecast');
  forecastElem.innerHTML = '';

  for (let i = 0; i < 5; i++) {
    forecastElem.innerHTML += dayForecastHTML(dayObject[i]);
  }
};