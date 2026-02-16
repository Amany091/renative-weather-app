import Search from "@/components/search/Search";
import useWeatherContext from "@/hooks/useWeatherContext";
import { realTimeFormat } from "@/utils/date";
import getWeatherTheme from "@/utils/weatherTheme";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CardTitle() {
  const [time, setTime] = useState<Date>(new Date());
  const { weatherData } = useWeatherContext();
  const { day, formattedMins, hour12, period, month, dayn } =
    realTimeFormat(time);
  const theme = getWeatherTheme();

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(new Date());
    }, 60_000);
    return () => clearInterval(timeInterval);
  }, []);

  return (
    <View style={styles.headerContainer}>
      <View style={{ flex: 1 }}>
        <View style={styles.titleBox}>
          <Ionicons name="location-sharp" size={24} color={theme.textPrimary} />
          <Text style={[styles.titleName, { color: theme.textPrimary }]}>
            {" "}
            {weatherData?.name}{" "}
          </Text>
        </View>
        <Text style={[styles.subTitle, { color: theme.textSecondary }]}>
          {`${day}, ${month} ${dayn} ${hour12}:${formattedMins} ${period}`}
        </Text>
      </View>
      <Search />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
  },
  titleBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleName: {
    fontSize: 35,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 16,
  },
});
