import useWeatherContext from "@/hooks/useWeatherContext";
import { ForecastListItem } from "@/types/forecast";
import { getHour, realTimeFormat, roundTemp } from "@/utils/date";
import getWeatherTheme from "@/utils/weatherTheme";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Button from "../Button";
import RemoteImage from "../Image";
import { getHourlyForecast } from "./forecastHelper";

export default function HourlyForecast() {
  const { forecastData } = useWeatherContext();
  const data = getHourlyForecast(
    forecastData?.timezone || 0,
    forecastData?.list || [],
  );
  const period = realTimeFormat(new Date()).period;
  const theme = getWeatherTheme();
  const router = useRouter();

  const RenderItem = useCallback(({ item }: { item: ForecastListItem }) => {
    const hour = getHour(item.dt, forecastData?.timezone || 0);
    const icon = item.weather[0].icon;
    return (
      <View style={[styles.forecastItem]}>
        <Text style={{ color: theme.textSecondary }}>
          {hour} {period}
        </Text>
        <RemoteImage icon={icon} style={{ width: 50, height: 50 }} />
        <Text style={{ color: theme.textPrimary }}>
          {roundTemp(item.main.temp)}°
        </Text>
        <Text style={{ color: theme.textSecondary }}>
          💧{item.main.humidity}%
        </Text>
      </View>
    );
  }, []);

  return (
    <View style={{ marginVertical: 20, marginHorizontal: 10 }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item, index) => String(index)}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        ListEmptyComponent={() => (
          <Text style={{ color: theme.textPrimary }}>
            Obs! No data available!
          </Text>
        )}
      />
      <Button
        title={"More"}
        onPress={() => router.push("/hourlyWeather")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  forecastItem: {
    padding: 10,
    alignItems: "center",
    borderRadius: 50,
  }
});
