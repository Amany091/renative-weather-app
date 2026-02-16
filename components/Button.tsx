import getWeatherTheme from "@/utils/weatherTheme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type ButtonProps = {
  title: string;
  onPress?: () => void;
  style?: object;
  variant?: string;
};

export default function Button({ onPress, style, title, variant }: ButtonProps) {
    const theme = getWeatherTheme()
  return (
    <TouchableOpacity style={[styles.button, style, {backgroundColor: variant ? variant : theme.buttonBackground}]} onPress={onPress}>
      <Text> {title} </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    width: 100,
    alignItems: "center",
  },
});
