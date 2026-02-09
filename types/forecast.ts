type ForecastWeather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type ForecastMain = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
};

export type ForecastListItem = {
  dt: number;
  main: ForecastMain;
  weather: ForecastWeather[];
  dt_txt: string;
};

type ForecastCity = {
  id: number;
  name: string;
  country: string;
  timezone: number;
  sunrise: number;
  sunset: number;
};

export type ForecastData = {
  list: ForecastListItem[];
  city: ForecastCity;
  timezone: number;
};
