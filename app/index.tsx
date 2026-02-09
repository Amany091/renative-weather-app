import clearMorningBackground from "@/assets/images/clearMorningSky.jpg";
import clearNightBackground from "@/assets/images/clearNightBackground.png";
import morningCloudyBackground from "@/assets/images/morningCloudySky.jpg";
import nightCloudyBackground from "@/assets/images/nightCloudySky.jpg";
import sandBackground from "@/assets/images/sandWeather.jpg";

import ForecastCard from "@/components/forecast/ForecastCard";
import WeatherCard from "@/components/weather/WeatherCard";
import useWeatherContext from "@/hooks/useWeatherContext";
import { realTimeFormat } from "@/utils/date";
import getWeatherTheme from "@/utils/weatherTheme";
import { ImageBackground, StyleSheet, Text } from "react-native";

export default function Weather() {
  const { period } = realTimeFormat(new Date());
  const { weatherData } = useWeatherContext();
  const theme = getWeatherTheme();

  function getBackgroundBasedWeather() {
    const status = weatherData?.weather[0].main;
    if (status === "Clear" && period === "PM") {
      return clearNightBackground;
    } else if (status === "Clear" && period === "AM" ) {
      return clearMorningBackground;
    } else if (status === "Clouds" && period === "PM") {
      return nightCloudyBackground;
    } else if (status === "Clouds" && period === "AM") {
      return morningCloudyBackground;
    } else if (status === "Sand") {
      return sandBackground;
    } else {
      return;
    }
  }
  return (
    <ImageBackground
      source={getBackgroundBasedWeather()}
      style={styles.container}
      resizeMode="cover"
    >
        <Text style={[{ color: theme.textPrimary }, styles.title]}>
          Weather
        </Text>
        <WeatherCard />
        <ForecastCard />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 45,
    textAlign: "center",
    marginVertical: 20,
  },
});
