import Accordion from '@/components/Accordion'
import { getHourlyForecast } from '@/components/forecast/forecastHelper'
import useWeatherContext from '@/hooks/useWeatherContext'
import { ForecastListItem } from '@/types/forecast'
import getWeatherTheme from '@/utils/weatherTheme'
import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { realTimeFormat } from '@/utils/date'
import { useRouter } from 'expo-router'

const theme = getWeatherTheme()

type CardProp = {
  title: string,
  value: string,
  icon: "thermometer" | "thermometer-outline" | "water-outline" | "water"
}

function Card({obj}: {obj: CardProp}) {
  return (
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 15,
          backgroundColor: theme.card,
          width: 150,
          borderRadius: 10,
          marginVertical: 5,
        }}
      >
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
          <Ionicons name={obj.icon} size={20} color={theme.textSecondary} />
          <Text style={{ fontSize: 16, fontWeight: "bold", color: theme.textPrimary }}> 
            {obj.title}
          </Text>
        </View>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: theme.textSecondary}}>{obj.value}</Text>
      </View>
  );
}

export default function HourlyWeather() {
  const {forecastData} = useWeatherContext()
  const data = getHourlyForecast(forecastData?.timezone || 0, forecastData?.list || [])
  const {hour12, period, formattedMins} = realTimeFormat(new Date())
  const router = useRouter()

  const RenderItem = ({item}: {item: ForecastListItem})=>{
    return (
      <Accordion item={item} timezone={forecastData?.timezone || 0}>
        <Text style={{ fontSize: 30, color: theme.textPrimary }}>
          {item.weather[0].description}
        </Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}} >
          <Card obj={{ title: "Feels Like", value: `${item.main.feels_like}°`, icon: 'thermometer-outline' }}/>
          <Card obj={{ title: "Humidity", value: `${item.main.humidity}%`, icon: 'water-outline' }} />
          <Card obj={{ title: "Pressure", value: `${item.main.pressure} hPa`, icon: 'thermometer-outline' }} />
          <Card obj={{ title: "Sea Level", value: `${item.main.sea_level} hPa`, icon: 'water' }} />
        </View>
      </Accordion>
    );
  }

  return (
    <View style={{paddingHorizontal: 20, backgroundColor: '#000000', flex: 1}}>
      <View style={{flexDirection: 'row', columnGap: 10, alignItems: 'center'}}>
        <Ionicons name='arrow-back' size={20} onPress={()=> router.push('/')} color= {theme.textPrimary} />
        <Text style={{fontSize: 20, fontWeight: 'bold', marginVertical: 10, color: theme.textPrimary}}>Hourly Weather</Text>
      </View>
      <Text style={{color: theme.textSecondary}} > {forecastData?.city.name}, {forecastData?.city.country} {hour12}:{formattedMins} {period}</Text>
      <FlatList 
        data={data}
        keyExtractor={(item)=> item.dt.toString()}
        renderItem={({item})=> <RenderItem item={item}/>}
      />
    </View>
  )
}
