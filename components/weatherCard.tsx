import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useThemeColor } from "@/hooks/use-theme-color";
import { IconSymbol } from "./ui/icon-symbol.ios";
import { weatherResult } from "@/api/weatherApi";
import { useFavorites } from "@/stores/useFavorites";

interface WeatherCardProp {
  weather: weatherResult;
  temp: number;
  unit: string;
}
export function WeatherCard({ weather, temp, unit }: WeatherCardProp) {
  const textColor = useThemeColor({}, "text");
  const { isFavorite, removeFavorite, addFavorite, loadFavorites } =
    useFavorites();
  const favorite = useFavorites((state) => state.isFavorite(weather.cityName));
  useEffect(() => {
    const init = async () => {
      await loadFavorites();
    };
    init();
  }, []);

  const toggleFavortie = async () => {
    if (!weather) return;
    if (isFavorite(weather.cityName)) {
      await removeFavorite(weather.cityName);
    } else {
      await addFavorite(weather.cityName);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.cityRow}>
        <Text style={[styles.cityName, { color: textColor }]}>
          {weather.cityName}
        </Text>
        <TouchableOpacity
          onPress={toggleFavortie}
          style={styles.favoriteButton}
        >
          <Text>
            {favorite ? (
              <IconSymbol name="heart.fill" color="red" />
            ) : (
              <IconSymbol name="heart.fill" color="grey" />
            )}
          </Text>
        </TouchableOpacity>
      </View>

      <Image
        source={{
          uri: `https://openweathermap.org/img/wn/${weather.icon}@4x.png`,
        }}
        style={styles.weatherIcon}
      />

      <Text style={[styles.temp, { color: textColor }]}>
        {temp}°{unit}
      </Text>

      <Text style={[styles.desc, { color: textColor }]}>
        {weather.description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 10,
  },
  cityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  cityName: {
    fontSize: 32,
    fontWeight: "600",
  },
  favoriteButton: {
    padding: 8,
  },
  favoriteText: {
    fontSize: 16,
  },
  weatherIcon: {
    width: 150,
    height: 150,
  },
  temp: {
    fontSize: 48,
    fontWeight: "bold",
    marginVertical: 5,
  },
  desc: {
    fontSize: 18,
    textTransform: "capitalize",
  },
});
