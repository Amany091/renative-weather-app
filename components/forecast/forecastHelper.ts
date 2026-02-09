import { ForecastListItem } from "@/types/forecast"
import { getDay, getHour, realTimeFormat } from "@/utils/date"

export function getDailyForecast(timezone: number, list: ForecastListItem[]){
    const days = new Set<string>()

    return list.filter(item =>{
        const day = getDay(item.dt, timezone)
        if(days.has(day)) return false;
        days.add(day)
        return true
    })
};

export function getHourlyForecast(timezone: number, list: ForecastListItem[]){
    const hours = new Set<number>();
    const now = realTimeFormat(new Date()).day;
    const todayHours = list.filter(item =>{
        const day = getDay(item.dt, timezone);
        if(day !== now) return false;
        const hour = getHour(item.dt, timezone);
        if(hours.has(hour)) return false;
        hours.add(hour)
        return true
    })
    return todayHours
}