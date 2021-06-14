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