import { useFavorites } from "@/stores/useFavorites";
import { text } from "node:stream/consumers";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useThemeColor } from "@/hooks/use-theme-color";
import { WeatherCardCompact } from "@/components/weatherCardCompact";

export default function FavoriteScreen() {
  const { favorites, removeFavorite } = useFavorites();
  const background = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");

  const handleRemove = async (cityName: string) => {
    await removeFavorite(cityName);
  };

  const handlePress = (cityName: string) => {
    console.log(`${cityName} was pressed now??`);
  };

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <Text style={[styles.title, { color: textColor }]}>Favorites</Text>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <WeatherCardCompact
            city={item}
            onSelect={() => handlePress(item)}
            onRemove={() => handleRemove(item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    color: "white",
  },
});
