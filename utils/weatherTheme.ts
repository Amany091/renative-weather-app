import { realTimeFormat } from "./date"
import { dayTheme, nightTheme } from "@/theme/weatherTheme"

 const getWeatherTheme = ()=>{
    const {period} = realTimeFormat(new Date())
    return period === 'PM' ? nightTheme : dayTheme
}

export default getWeatherTheme