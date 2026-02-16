import React from "react";
import { StyleSheet, View } from "react-native";
import WeatherInfo from "./WeatherInfo";

export default function WeatherCard() {
  return (
    <View style={[styles.container]}>
      <WeatherInfo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    height: 400,
    justifyContent: "center",
    alignItems: "center",
  },
});
