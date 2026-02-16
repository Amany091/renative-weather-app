import { realTimeFormat } from "./date"
import { dayTheme, nightTheme } from "@/theme/weatherTheme"

 const getWeatherTheme = ()=>{
    const {period, hour12} = realTimeFormat(new Date())
    const isNight = period === 'PM' && hour12 >= 10;
    const isEvening = period === 'PM' && hour12 >= 5 && hour12 < 10;

    return isNight ? nightTheme : dayTheme;
}

export default getWeatherTheme