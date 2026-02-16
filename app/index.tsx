import clearMorningBackground from "@/assets/images/clearMorningSky.jpg";
import clearNightBackground from "@/assets/images/clearNightBackground.png";
import morningCloudyBackground from "@/assets/images/morningCloudySky.jpg";
import nightCloudyBackground from "@/assets/images/nightCloudySky.jpg";
import RainyWeather from "@/assets/images/rainy.jpg";
import sandBackground from "@/assets/images/sandWeather.jpg";

import Tab from "@/components/tabs/Tab";
import CardTitle from "@/components/weather/CardTitle";
import WeatherCard from "@/components/weather/WeatherCard";
import useWeatherContext from "@/hooks/useWeatherContext";
import { realTimeFormat } from "@/utils/date";
import getWeatherTheme from "@/utils/weatherTheme";
import { ImageBackground, StyleSheet, View } from "react-native";
import {LinearGradient} from 'expo-linear-gradient'
import {BlurView} from 'expo-blur'

export default function Weather() {
  const { period } = realTimeFormat(new Date());
  const { weatherData } = useWeatherContext();
  const theme = getWeatherTheme();

  function getBackgroundBasedWeather() {
    const status = (weatherData?.weather[0].main as string) || "";
    if (status === "Clear" && period === "PM") {
      return clearNightBackground;
    } else if (status === "Clear" && period === "AM") {
      return clearMorningBackground;
    } else if (status === "Clouds" && period === "PM") {
      return nightCloudyBackground;
    } else if (status === "Clouds" && period === "AM") {
      return morningCloudyBackground;
    } else if (status === "Sand" || status === "Dust") {
      return sandBackground;
    } else if (status === "Rain") {
      return RainyWeather;
    } else {
      return;
    }
  }
  return (
    <ImageBackground
      source={getBackgroundBasedWeather()}
      style={[styles.container]}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
        style={StyleSheet.absoluteFill}
      />
      <BlurView intensity={50} tint="dark" style={{ flex: 1 }}>
        <View style={styles.header}>
        <CardTitle />
        <WeatherCard />
        <Tab />
        </View>
      </BlurView>
      {/* <ForecastCard /> */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
  },
  glass: {
  flex: 1,
  padding: 20,
  borderRadius: 20,
  overflow: 'hidden',
}
});
