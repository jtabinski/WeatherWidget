const apiKey = 'cc42663f6c57ef798f9e29193e9b86f4';
const baseUrl = 'https://api.openweathermap.org/data/2.5/';
const unitsParam = 'units=metric';

const getCurrentWeather = async (lat, lon) => {
  const response = await fetch(
    `${baseUrl}weather?lat=${lat}&lon=${lon}&appid=${apiKey}&${unitsParam}`
  );
  const data = await response.json();
  return data;
};

const getFiveDay = async (lat, lon) => {
  const response = await fetch(
    `${baseUrl}forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&${unitsParam}`
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
    forecastElem.innerHTML += dayHTML(dayObject[i]);
  }
};

navigator.geolocation.getCurrentPosition((position) => {
  const { latitude, longitude } = position.coords;
  getCurrentWeather(latitude, longitude).then((data) => {
    const conditions = {
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      iconId: data.weather[0].icon,
    };
    currentCond
  (conditions);
  });

  getFiveDay(latitude, longitude).then((data) => {
    const allData = [...data.list];
    const days = {};

    const today = new Date().toLocaleString('en-CA', { weekday: 'long' });

    allData.forEach((obj) => {
      const date = new Date(obj.dt_txt + ' UTC').toLocaleString(
        'en-CA',
        { weekday: 'long' }
      );
      if (days[date]) {
        days[date].push(obj);
      } else {
        days[date] = [];
        days[date].push(obj);
      }
    });

    const dayCondObjects = [];
    for (let day in days) {
      const middle = Math.floor(days[day].length / 2);
      const dayCond = {
        name: day,
        iconId: days[day][middle].weather[0].icon,
        description: days[day][middle].weather[0].description,
        highTemp: -999,
        lowTemp: 999,
      };

      for (let obj of days[day]) {
        if (obj.main.temp_min < dayCond.lowTemp) {
          dayCond.lowTemp = Math.round(obj.main.temp_min);
        }

        if (obj.main.temp_max > dayCond.highTemp) {
          dayCond.highTemp = Math.round(obj.main.temp_max);
        }
      }

      if (dayCond.name !== today) {
        dayCondObjects.push(dayCond);
      }
    }
    dayForcastelem(dayCondObjects);
  });
});
