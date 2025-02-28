import axios from "axios";

const WEATHER_DATA_BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

const getWeatherData = async () => {

  try {
    const controller = new AbortController();
    const signal = controller.signal;
    const requestURL = `${WEATHER_DATA_BASE_URL}10026/2025-02-28?key=KLVGWCSLHJBXSEUE98R4RNXRN`;
    const weatherData = await axios.get(requestURL, { signal });
    console.log("weatherData: ", weatherData);
  } catch(e) {
    console.log("error: ", e);
  }

};

export default getWeatherData;
