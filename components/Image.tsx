import React from "react";
import { Image } from "react-native";

export default function RemoteImage({
  icon,
  style,
}: {
  icon: string;
  style?: object;
}) {
  const WEATHER_HOST = process.env.EXPO_PUBLIC_WEATHER_HOST_URL;
  const fullUri = `${WEATHER_HOST}/img/wn/${icon}@2x.png`;

  return icon ? <Image source={{ uri: fullUri }} style={style} /> : null;
}
