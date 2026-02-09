type WeatherTheme = {
  background: string;
  card: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  buttonBackground?: string;
};

export const dayTheme: WeatherTheme = {
  background: "#87CEEB", // sky blue
  card: "rgba(255,255,255,0.85)",
  textPrimary: "#1A1A1A",
  textSecondary: "#555",
  accent: "#FFA500",
  buttonBackground: "#FFA500",
};

export const nightTheme: WeatherTheme = {
  background: "#0B1D3A", // deep night blue
  card: "rgba(20,30,60,0.8)",
  textPrimary: "#FFFFFF",
  textSecondary: "#B0B8C4",
  accent: "#4DA3FF",
  buttonBackground: "#4DA3FF",
}; 