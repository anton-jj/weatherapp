import { useFavorites } from "@/stores/useFavorites";
import { text } from "node:stream/consumers";
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function FavoriteScreen() {
  const { favorites } = useFavorites();
  const background = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <Text style={{ color: tintColor }}>
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </Text>
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
  text: {
    color: "white",
  },
});
