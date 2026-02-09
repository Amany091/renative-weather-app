import React from 'react'
import { View, StyleSheet } from 'react-native'
import DailyForecast from './DailyForecast'

export default function ForecastCard() {
  return (
    <View style={styles.forecastContainer}>
      <DailyForecast />
    </View>
  );
}

const styles = StyleSheet.create({
    forecastContainer: {
      margin: 10,
      paddingVertical: 20,
      paddingHorizontal: 10,
      backdropFilter: ".7",
      borderRadius: 10,
    },
});