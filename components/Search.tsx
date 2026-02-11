import useWeatherContext from "@/hooks/useWeatherContext";
import getWeatherTheme from "@/utils/weatherTheme";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, TextInput, View } from "react-native";

export default function Search() {
    const {setCity} = useWeatherContext()
  const theme = getWeatherTheme();
  const [search, setSearch] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const animatedWidth = useRef(new Animated.Value(0)).current;
  
  useEffect(()=>{
    const timer = setTimeout(() => {
        setDebouncedSearch(search)
    }, 1000);
    return () => clearTimeout(timer);
  },[search])

  useEffect(()=>{
    if(debouncedSearch) {
        setCity(debouncedSearch)
    }
  },[debouncedSearch])

  function toggleSearchInput() {
    if (toggleSearch) {
      Animated.timing(animatedWidth, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setToggleSearch(false));
    } else {
      setToggleSearch(true);
      Animated.timing(animatedWidth, {
        toValue: 200,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }

  return (
    <View style={styles.searchContainer}>
      <Animated.View
        style={[{ width: animatedWidth}, styles.animatedContainer]}
      >
        <TextInput
          autoFocus={toggleSearch}
          placeholder="city"
          defaultValue={search}
          onChange={(e) => setSearch(e.nativeEvent.text)}
          style={[
            styles.input,
            {
              backgroundColor: theme.background,
              color: theme.textPrimary,
              borderColor: theme.textPrimary,
            },
          ]}
        />
      </Animated.View>
      <Pressable onPress={toggleSearchInput}>
        <Ionicons name="search" size={24} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    elevation: 10,
  },
  animatedContainer: {
    overflow: "hidden",
     marginRight: 8,
  },
  input: {
    // flex: 1,
    zIndex: 1000,
    height: 40,
    width: 200,
    borderWidth: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 10,
    marginRight: 8,
    borderRadius: 8,
  },
});
