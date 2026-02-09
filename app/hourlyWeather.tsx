import Accordion from '@/components/Accordion'
import { getHourlyForecast } from '@/components/forecast/forecastHelper'
import useWeatherContext from '@/hooks/useWeatherContext'
import { ForecastListItem } from '@/types/forecast'
import getWeatherTheme from '@/utils/weatherTheme'
import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { realTimeFormat } from '@/utils/date'

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
          <Text style={{ fontSize: 16, fontWeight: "bold", color: theme.textSecondary }}> 
            {obj.title}
          </Text>
        </View>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{obj.value}</Text>
      </View>
  );
}

export default function HourlyWeather() {
  const {forecastData} = useWeatherContext()
  const data = getHourlyForecast(forecastData?.timezone || 0, forecastData?.list || [])
  const {hour12, period, formattedMins} = realTimeFormat(new Date())

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
    <View style={{marginHorizontal: 10}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginVertical: 10}}>Hourly Weather</Text>
      <Text style={{color: theme.textSecondary}} > {forecastData?.city.name}, {forecastData?.city.country} {hour12}:{formattedMins} {period}</Text>
      <Text style={{color: theme.textSecondary}}></Text>
      <FlatList 
        data={data}
        keyExtractor={(item)=> item.dt.toString()}
        renderItem={({item})=> <RenderItem item={item}/>}
      />
    </View>
  )
}
