import getWeatherTheme from "@/utils/weatherTheme";
import React, { useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import DailyForecast from "../forecast/DailyForecast";
import HourlyForecast from "../forecast/HourlyForecast";

export default function Tab() {
  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();
  const theme = getWeatherTheme();

  const renderScene = SceneMap({
    today: HourlyForecast,
    week: DailyForecast,
  });

  const [routes] = useState([
    { key: "today", title: "Today" },
    { key: "week", title: "Week" },
  ]);
  return (
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            style={styles.tabBar}
            {...props}
            activeColor={theme.activeTab}
            indicatorStyle={[
              styles.indicator,
              { backgroundColor: theme.activeTab },
            ]}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: "transparent",
    padding: 20,
  },
  tabBar: {
    backgroundColor: "",
    elevation: 0,
    shadowOpacity: 0,
  },
  indicator: {
    backgroundColor: "white",
    height: 2,
    width: 100, // smaller indicator like your UI
    marginLeft: 50, // adjust for center alignment
  },
  label: {
    fontSize: 16,
    textTransform: "capitalize",
  },
});
