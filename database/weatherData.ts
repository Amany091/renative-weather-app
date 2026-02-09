import { get } from "@/services/httpService";

export const fetchWeatherData = async (city: string) => {
  try {
    const response = await get('/weather', {urlParams: { q: city }});
    return {
      base: response.data?.base,
      clouds: response.data?.clouds,
      coord: response.data?.coord,
      dt: response.data?.dt,
      id: response.data?.id,
      main: response.data?.main,
      name: response.data?.name,
      sys: response.data?.sys,
      timezone: response.data?.timezone,
      visibility: response.data?.visibility,
      weather: response.data?.weather,
      wind: response.data?.wind,
    };
  } catch (error) {
    return error;
  }
};

export const fetchForecastData = async (city: string)=>{
  try {
    const response = await get('/forecast', {urlParams: {q: city}})
    return {
      list: response.data.list,
      city: response.data.city,
      timezone: response.data.timezone
    }
  } catch (error) {
    return error
  }
}
