import axios from 'axios';

const date = new Date();
const timestamp =
date.getTime() / 1000 + date.getTimezoneOffset() * 60;

export const getLocationWeather = async location => {
  const URL = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.APIWEATHERKEY}`;
  try {
    const response = await axios.get(URL);
    console.log(response.data);
    return { coord: response.data.coord, weather: response.data.weather };
  } catch (error) {
    console.log('An error occur when getting location weather', error);
  }
}

export const getLocationTime = async location => {
  try {
    const googleUrl = `https://maps.googleapis.com/maps/api/timezone/json?location=${
      location.lat
    },${location.lon}&timestamp=${timestamp}&key=${process.env.GOOGLEAPIKEY}`;

    const getTime = await axios.get(googleUrl);
    return getTime.data;
  } catch (error) {
    console.log('An error occur when getting location time', error);
  }
}

export const computeOffset = time => {
  const { dstOffset, rawOffset } = time;
  const offsets = dstOffset * 1000 + rawOffset * 1000;
  return offsets
}

export const computeLocalDate = offsets => {
  const localdate = new Date(timestamp * 1000 + offsets);
  return localdate.toLocaleString();
}