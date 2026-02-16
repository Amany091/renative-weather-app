import { ForecastListItem } from "@/types/forecast";
import { getHour, getPeriod } from "@/utils/date";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    LayoutAnimation,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import RemoteImage from "./Image";
import getWeatherTheme from "@/utils/weatherTheme";

export default function Accordion({
  children,
  item,
  timezone,
}: {
  children: React.ReactNode;
  item: ForecastListItem;
  timezone: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const theme = getWeatherTheme()

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.accContainer}>
      <Pressable onPress={toggleExpand}>
        <View style={styles.flexContainer}>
          <Text style={{color: theme.textSecondary}}>
            {getHour(item.dt, timezone)} {getPeriod(item.dt, timezone)}
          </Text>
          <RemoteImage
            icon={item?.weather[0].icon}
            style={{ width: 30, height: 30 }}
          />
          <Text style={{color: theme.textSecondary}}> {item.main.temp}° </Text>
          <Text style={{color: theme.textSecondary}}> 💧{item.main.humidity}% </Text>
          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={24}
            color="black"
          />
        </View>
      </Pressable>
      {expanded && children}
    </View>
  );
}

const styles = StyleSheet.create({
  accContainer: {
    overflow: "hidden",
    borderRadius: 10,
  },
  flexContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
});
