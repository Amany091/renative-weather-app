import useWeatherContext from "@/hooks/useWeatherContext";
import { ForecastListItem } from "@/types/forecast";
import { getDay, roundTemp } from "@/utils/date";
import getWeatherTheme from "@/utils/weatherTheme";
import React, { useCallback } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import RemoteImage from "../Image";
import { getDailyForecast } from "./forecastHelper";

export default function DailyForecast() {
  const { forecastData, loading } = useWeatherContext();
  const data = getDailyForecast(
    forecastData?.timezone || 0,
    forecastData?.list || [],
  );
  const theme = getWeatherTheme();

  const RenderItem = useCallback(({ item }: { item: ForecastListItem }) => {
    const icon = item.weather[0].icon;
    const day = getDay(item.dt, forecastData?.timezone || 0);
    return (
      <View style={[styles.forecastItem, { backgroundColor: theme.card }]}>
        <RemoteImage icon={icon} style={{ width: 50, height: 50 }} />
        <Text style={{ color: theme.textPrimary }}>{day}</Text>
        <Text style={{ color: theme.textSecondary }}>
          {roundTemp(item.main.temp_max)}°
        </Text>
        <Text style={{ color: theme.textPrimary }}>
          {roundTemp(item.main.temp_min)}°
        </Text>
      </View>
    );
  }, []);

  if (loading)
    return (
      <Text style={{ color: theme.textPrimary, fontSize: 25 }}>loading...</Text>
    );

  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item, index) => String(index)}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        ListEmptyComponent={() =>
          !loading && (
            <Text style={{ color: theme.textPrimary }}>
              Obs! No data available!
            </Text>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  forecastItem: {
    padding: 10,
    alignItems: "center",
    borderRadius: 50,
  },
});
