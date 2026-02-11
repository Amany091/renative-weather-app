import { ForecastListItem } from "@/types/forecast";
import { getDay, getHour, getPeriod } from "@/utils/date";
import React, { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import RemoteImage from "../Image";

export function RenderForecastItem({
  item,
  timezone,
}: {
  item: ForecastListItem;
  timezone: number | undefined;
}) {
  const ForecastItem = useCallback(() => {
    const icon = item.weather[0].icon;
    const day = getDay(item.dt, timezone || 0);
    const hour = getHour(item.dt, timezone || 0);
    const period = getPeriod(item.dt, timezone || 0);
    const isToday =
      new Date().toLocaleDateString("en-US", { weekday: "long" }) === day;

    return (
      <View style={styles.forecastContainer}>
        <Text style={isToday ? styles.todayCol : styles.forecastText}>
          {isToday ? "Today" : day}
        </Text>
        <Text style={isToday ? styles.todayCol : styles.forecastText}>
          {`${hour} ${period}`}
        </Text>
        <Text style={styles.forecastText}> 💧 {item.main.humidity}% </Text>
        <RemoteImage icon={icon} style={{ width: 40, height: 40 }} />
        <Text style={isToday ? styles.todayCol : styles.forecastText}>
          {Math.round(item.main.temp_max)}°/ {Math.round(item.main.temp_min)}°
        </Text>
      </View>
    );
  }, []);

  return ForecastItem();
}

const styles = StyleSheet.create({
  forecastContainer: {
    padding: 10,
    backgroundColor: "hsla(0, 0%, 0%, 0.2)",
    backdropFilter: ".7",
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  forecastText: {
    color: "#fff",
  },
  todayCol: {
    color: "#c2c2c2",
  },
});
