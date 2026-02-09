import React, { useState } from 'react'
import { View, LayoutAnimation, StyleSheet, Text, Image, Pressable } from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import { getHour, getPeriod } from '@/utils/date';
import { ForecastListItem } from '@/types/forecast';

export default function Accordion({children, item, timezone}: 
    {children: React.ReactNode, item: ForecastListItem, timezone: number}) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = ()=>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setExpanded(!expanded)
    };

  return (
    <View style={styles.accContainer}>
        <Pressable
            onPress={toggleExpand}
        >
            <View style={styles.flexContainer}>
            <Text> {getHour(item.dt, timezone)} {getPeriod(item.dt, timezone)} </Text>
            <Image source={{uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}} style={{width: 30, height: 30}} />
            <Text> {item.main.temp}° </Text>
            <Text> 💧{item.main.humidity}% </Text>
            <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={24} color="black" />
            </View>
        </Pressable>
        {expanded && children}
    </View>
  )
}

const styles = StyleSheet.create({
    accContainer: {
        overflow: 'hidden',
        borderRadius: 10,
    },
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    }
})
