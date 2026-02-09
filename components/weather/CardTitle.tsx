import useWeatherContext from "@/hooks/useWeatherContext";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { realTimeFormat } from "@/utils/date";
import getWeatherTheme from "@/utils/weatherTheme";

export default function CardTitle() {
  const [time, setTime] = useState<Date>(new Date())
  const { weatherData } = useWeatherContext();
  const {day, formattedMins, hour12, period, month, dayn} = realTimeFormat(time)
  const theme = getWeatherTheme()

  useEffect(()=>{
    const timeInterval = setInterval(() => {
        setTime(new Date())
    }, 60_000);
    return () => clearInterval(timeInterval) 
  },[])

  return (
    <View >
      <Text style={[styles.titleName, {color: theme.textPrimary}]}> {weatherData?.name} </Text>
      <Text style={[styles.subTitle, {color: theme.textSecondary}]}>
        {`${day}, ${month} ${dayn} ${hour12}:${formattedMins} ${period}`}
      </Text>
    </View>
  );
};


const styles = StyleSheet.create({

    titleName: {
        fontSize: 35,
        fontWeight: 'bold',
    },
    subTitle: {
      fontSize: 16
    }
})
