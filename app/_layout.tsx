import { ContextWeatherProvider } from "@/context/weatherContext";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
    <StatusBar barStyle={'light-content'} />
      <ContextWeatherProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "#2E335A" },
            headerTintColor: "white",
          }}
        />
      </ContextWeatherProvider>
    </>
  );
}
