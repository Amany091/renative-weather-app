import getWeatherTheme from "@/utils/weatherTheme";
import React from "react";
import { StyleSheet, View, TouchableOpacity, Text,  } from "react-native";
import HourlyForecast from "../forecast/HourlyForecast";
import WeatherInfo from "./WeatherInfo";
import CardTitle from "./CardTitle";
import { useRouter } from "expo-router";

const theme = getWeatherTheme();
export default function WeatherCard() {
  const router = useRouter()
  return (
    <View style={[styles.container, styles.shadow,{ backgroundColor: theme.card }]}>
      <CardTitle />
      <WeatherInfo />
      <HourlyForecast />
      <TouchableOpacity
        onPress={()=> router.push('/hourlyWeather')}
        style={styles.button}
      >
        <Text style={{color: theme.textPrimary}}>more</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    backdropFilter: ".7",
    borderRadius: 10,
  },
  textStyle: {
    color: "#fff",
  },
  shadow: {
    shadowColor: theme.background,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: .2,
    shadowRadius: 1.84,
    elevation: 5
  },
  button: {
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: theme.buttonBackground,
    borderRadius: 20
  }
});
