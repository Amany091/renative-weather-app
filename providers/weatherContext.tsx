import { fetchForecastData, fetchWeatherData } from "@/database/weatherData";
import WeatherData from "@/types/weatherDataType";
import { ForecastData } from "@/types/forecast";
import { createContext, useEffect, useState } from "react";

type ContextData = {
  weatherData: WeatherData | undefined;
  forecastData: ForecastData | undefined ,
  setCity: React.Dispatch<React.SetStateAction<string>>,
  loading: boolean
};

export const WeatherContext = createContext({} as ContextData);

export const ContextWeatherProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>( undefined );
  const [forecastData, setForecastData] = useState<ForecastData>()
  const [city, setCity] = useState<string>("cairo");
  const [loading, setLoading] = useState(false)

  async function getWeatherData() {
    setLoading(true)
    const response = await fetchWeatherData(city);
    setWeatherData(response as WeatherData);
    setLoading(false)
  };

  async function getForecastData(){
    setLoading(true)
    const response = await fetchForecastData(city);
    setForecastData(response as ForecastData)
    setLoading(false)
  }

  useEffect(() => {
    getWeatherData();
    getForecastData();
  }, [city]);

  return (
    <WeatherContext.Provider value={{ weatherData, setCity, forecastData, loading }}>
      {children}
    </WeatherContext.Provider>
  );
};
