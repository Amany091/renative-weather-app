import useWeatherContext from "@/hooks/useWeatherContext";
import getWeatherTheme from "@/utils/weatherTheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RemoteImage from "../Image";

export default function WeatherInfo() {
  const { weatherData, forecastData, loading } = useWeatherContext();
  const theme = getWeatherTheme();
  const temperature = weatherData?.main.temp as number;
  const icon = weatherData?.weather[0].icon as string;
  const [tempMax, tempMin] = [
    forecastData?.list[0].main.temp_max,
    forecastData?.list[0].main.temp_min,
  ];

  if (loading) return <Text style={{ fontSize: 25 }}> loading... </Text>;

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <RemoteImage icon={icon} style={{ width: 100, height: 100 }} />
        <Text style={[styles.temperatureText, { color: theme.textPrimary }]}>
          {" "}
          {Math.floor(temperature)}°{" "}
        </Text>
      </View>
      <View>
        <Text style={{ color: theme.textSecondary }}>
          {weatherData?.weather[0]?.description}
        </Text>
        <Text style={{ color: theme.textSecondary }}>
          {Math.round(tempMax as number)}°/ {Math.round(tempMin as number)}°
        </Text>
        <Text style={{ color: theme.textSecondary }}>
          Feels like {Math.round(weatherData?.main.feels_like as number)}°
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  temperatureText: {
    fontSize: 35,
    fontWeight: "bold",
  },
  image: {
    color: "#fff",
  },
});
