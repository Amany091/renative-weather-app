import useWeatherContext from "@/hooks/useWeatherContext";
import getWeatherTheme from "@/utils/weatherTheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RemoteImage from "../Image";
import { roundTemp } from "@/utils/date";
import { Feather, MaterialIcons } from "@expo/vector-icons";

export default function WeatherInfo() {
  const { weatherData, loading } = useWeatherContext();
  const theme = getWeatherTheme();
  const temperature = weatherData?.main.temp as number;
  const icon = weatherData?.weather[0].icon as string || '';

  if (loading) return <Text style={{ fontSize: 25 }}> loading... </Text>;

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
        <Text style={{ color: theme.textPrimary, fontSize: 28 }}>
          {weatherData?.weather[0]?.description}
        </Text>
        <RemoteImage icon={icon} style={{ width: 50, height: 50 }} />
      </View>
      <Text style={[styles.temperatureText, { color: theme.textPrimary }]}>
        {roundTemp(temperature)}°C
      </Text>
      <View style={styles.weatherInfoContainer}>
        <View style={styles.centeralizedText}>
          <Feather name="wind" size={20} />
          <Text style={{ color: theme.textSecondary }}> {weatherData?.wind.speed} m/s</Text>
        </View>
        <View style={styles.centeralizedText} >
          <MaterialIcons name="water-drop" size={20} />
          <Text style={{ color: theme.textSecondary }}> {weatherData?.main.humidity}% </Text>
        </View>
        <View style={styles.centeralizedText}>
          <MaterialIcons name='umbrella' size={20} />
          <Text style={{ color: theme.textSecondary }}> {weatherData?.main.feels_like} </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  temperatureText: {
    fontSize: 35,
    fontWeight: "bold",
  },
  image: {
    color: "#fff",
  },
  weatherInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 20
  },
  centeralizedText: {
    alignItems: 'center'
  }
});
