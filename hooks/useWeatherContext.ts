import { WeatherContext } from "@/context/weatherContext";
import { use } from "react";

const useWeatherContext = () => {
  const context = use(WeatherContext);
  if (!context) throw new Error("Obs! Failed Data");
  return context;
};

export default useWeatherContext;
