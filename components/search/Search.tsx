import useWeatherContext from "@/hooks/useWeatherContext";
import getWeatherTheme from "@/utils/weatherTheme";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import SearchModal from "./SearchModal";

export default function Search() {
  const { setCity } = useWeatherContext();
  const theme = getWeatherTheme();
  const [search, setSearch] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  // const animatedWidth = useRef(new Animated.Value(0)).current;

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setDebouncedSearch(search);
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, [search]);

  function handleSearch() {
    // if (!debouncedSearch) return;
    setCity(search);
    setToggleSearch(false);
  }

  // function toggleSearchInput() {
  //   if (toggleSearch) {
  //     Animated.timing(animatedWidth, {
  //       toValue: 0,
  //       duration: 300,
  //       useNativeDriver: false,
  //     }).start(() => setToggleSearch(false));
  //   } else {
  //     setToggleSearch(true);
  //     Animated.timing(animatedWidth, {
  //       toValue: 200,
  //       duration: 300,
  //       useNativeDriver: false,
  //     }).start();
  //   }
  // }

  return (
    <View style={styles.searchContainer}>
      <Pressable onPress={() => setToggleSearch(true)}>
        <Ionicons name="search" size={24} color={theme.textPrimary} />
      </Pressable>
      <SearchModal
        toggleSearch={toggleSearch}
        setToggleSearch={setToggleSearch}
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    elevation: 10,
  },
});
