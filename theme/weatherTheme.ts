type WeatherTheme = {
  background: string;
  card: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  buttonBackground?: string;
  headerBackground?: string;
  activeTab?: string;
};

export const dayTheme: WeatherTheme = {
  background: "#e7eef1", // sky blue
  card: "rgba(255,255,255,0.85)",
  textPrimary: "#f3eeee",
  textSecondary: "#7e7d7d",
  accent: "#FFA500",
  buttonBackground: "#FFA500",
  activeTab: " rgba(255, 165, 0, 0.4)",
  headerBackground: "#3236f5",
};

export const nightTheme: WeatherTheme = {
  background: "#0B1D3A", // deep night blue
  card: "rgba(20,30,60,0.8)",
  textPrimary: "#FFFFFF",
  textSecondary: "#B0B8C4",
  accent: "#4DA3FF",
  buttonBackground: "#4DA3FF",
  activeTab: " rgba(77, 163, 255, 0.4)",
  headerBackground: "#4DA3FF",
};
