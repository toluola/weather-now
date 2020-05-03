import axios from 'axios'; 

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
