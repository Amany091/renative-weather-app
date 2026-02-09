import React, { useCallback } from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { getHourlyForecast } from './forecastHelper'
import useWeatherContext from '@/hooks/useWeatherContext'
import { getHour, realTimeFormat, roundTemp } from '@/utils/date'
import { ForecastListItem } from '@/types/forecast'
import getWeatherTheme from '@/utils/weatherTheme'

export default function HourlyForecast() {
    const WEATHER_HOST = process.env.EXPO_PUBLIC_WEATHER_HOST_URL;
    const {forecastData} = useWeatherContext()
    const data = getHourlyForecast(forecastData?.timezone || 0, forecastData?.list || []);
    const period = realTimeFormat(new Date()).period
    const theme = getWeatherTheme()

    const RenderItem = useCallback(({item}: {item: ForecastListItem})=>{
        const hour = getHour(item.dt, forecastData?.timezone || 0);
        const icon = item.weather[0].icon;
        return (
            <View style={[styles.forecastItem]}>
                <Text style={{color: theme.textSecondary}} > {hour} {period} </Text>
                {icon && <Image 
                    source={{uri: `${WEATHER_HOST}/img/wn/${icon}@2x.png` }}
                    style={{width: 50, height: 50}}
                />}
                <Text style={{color: theme.textPrimary}} > {roundTemp(item.main.temp)}° </Text>
                <Text style={{color: theme.textSecondary}} > 💧{item.main.humidity}% </Text>
            </View>
        )
    },[])

  return (
    <View style={{marginBottom: 20}}>
        {/* <Text style={{color: theme.textPrimary, marginVertical: 10, fontSize: 25}}>Hourly Forecast</Text> */}
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({ item }) => <RenderItem item={item} />}
            keyExtractor={(item, index) => String(index)}
            // ItemSeparatorComponent={()=> <View style={{width: 10}} />}
            ListEmptyComponent={() => <Text style={{color: theme.textPrimary}}>Obs! No data available!</Text>}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    forecastItem: {
        padding: 10,
        alignItems: 'center',
        borderRadius: 50,
    }
})
