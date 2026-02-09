import React, { useCallback } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import useWeatherContext from '@/hooks/useWeatherContext'
import getWeatherTheme from '@/utils/weatherTheme'

type DetailItem = {
    id: number;
    icon: "sunny" | "water" | "cloud" ;
    label: string;
    value: (val: number) => number;
    color: string
}

const details = [
    {id: 1,icon: 'sunny', label: 'Sunset', value: (val: number)=> val, color: '#a7c308' },
    {id: 2,icon: 'sunny', label: 'Sunrise', value: (val: number)=> val, color: '#a7c308' },
    {id: 3,icon: 'water', label: 'Humidity', value: (val: number)=> `${val}%`,color: '#0808d833'},
    {id: 4,icon: 'cloud', label: 'Wind', value: (val: number)=> `${val} km/h`, color: '#43434545'},
]

export default function WeatherDetails() {
    const {weatherData} = useWeatherContext()
    const theme = getWeatherTheme()

    const RenderItem = useCallback(({item}:{item: DetailItem})=>{
        return (
            <View style={styles.detailsContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                    <Ionicons name={item.icon} size={20} color={item.color} />
                    <Text style={{color: theme.textPrimary}}>{item.label}</Text>
                </View>
                <Text style={{color: theme.textPrimary}}>{item.value(weatherData?.wind.speed || 0)}</Text>
            </View>
        )
    },[])

  return (
    <View style={[{backgroundColor: theme.card}]}>
        <FlatList 
            data= {details}
            renderItem={({item})=> <RenderItem item={item as DetailItem} />}
            ListEmptyComponent={()=><Text style={{color: theme.textPrimary, fontSize: 30}}>No details available</Text>}
            ItemSeparatorComponent={()=><View style={{height: 10}} />}
            keyExtractor={(item)=> item.id.toString()}

        />
    </View>
  )
}

const styles = StyleSheet.create({
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
        padding: 10,
        borderRadius: 10
    }
})
