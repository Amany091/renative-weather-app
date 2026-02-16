import { ContextWeatherProvider } from "@/providers/weatherContext";
import getWeatherTheme from "@/utils/weatherTheme";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  const theme = getWeatherTheme();
  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <ContextWeatherProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: theme.background },
            headerTintColor: theme.textPrimary,
            contentStyle: {
              backgroundColor: theme.background,
              paddingTop: StatusBar.currentHeight,
            },
            headerShadowVisible: false,
            headerShown: false,
          }}
        />
      </ContextWeatherProvider>
    </>
  );
}
