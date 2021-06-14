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