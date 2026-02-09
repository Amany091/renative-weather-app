type WeatherMain = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
};

type WeatherSys = {
  country: string;
  sunrise: number;
  sunset: number;
  type?: number;
  id?: number;
};

type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type WeatherWind = {
    speed: number;
    deg: number;
  };

type WeatherCoord = {
  lat: number;
  lon: number;
};

type WeatherClouds = {
  all: number
}

type WeatherData = {
  base: string;
  dt: number;
  id: number; // city ID
  name: string;
  timezone: number;
  visibility: number;
  main:WeatherMain,
  sys: WeatherSys
  clouds: WeatherClouds,
  coord: WeatherCoord,
  weather: Weather[];
  wind: WeatherWind
};

export default WeatherData;
