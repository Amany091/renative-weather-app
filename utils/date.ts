
export function getDate(dt: number, timeZone: number) {
  return new Date((dt + timeZone) * 1000);
}

export function getDay(dt: number, timeZone: number) {
  const date = getDate(dt, timeZone);
  return date.toLocaleDateString('en-US', {weekday: 'short'})
}

export function getHour(dt: number, timeZone: number) {
  const date = getDate(dt, timeZone);
  const hour24 = date.getUTCHours();
  return hour24 % 12 === 0 ? 12 : hour24 % 12;
}

export function getMinutes(dt: number, timeZone: number) {
  const date = getDate(dt, timeZone);
  const minutes = date.getUTCMinutes();
  return Math.floor(minutes).toString().padStart(2, "0");
}

export function formatTime(dt: number, timezone: number) {
  const hour = getHour(dt, timezone);
  const minutes = getMinutes(dt, timezone);
  const period = getPeriod(dt, timezone);

  return `${hour}:${minutes} ${period}`;
}

export function realTimeFormat(time: Date){
  const hour24 = time.getHours();
  const hour12 = hour24 % 12;
  const minutes = time.getUTCMinutes();
  const formattedMins = Math.floor(minutes).toString().padStart(2, '0')
  const period = hour24 >= 12 ? 'PM' : 'AM'
  const day = time.toLocaleDateString('en-US', {weekday: 'short'})
  const month = time.toLocaleDateString('en-US', {month: 'long'})
  const dayn = time.getDate()

  return { hour12, formattedMins, period, day, month, dayn }
}

export function getPeriod(dt: number, timezone: number) {
  const date = getDate(dt, timezone);
  return date.getUTCHours() >= 12 ? "PM" : "AM";
}

export function roundTemp(temp: number) {
  return Math.round(temp);
}
