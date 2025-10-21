import { useFavorites } from "@/stores/useFavorites";
import { text } from "node:stream/consumers";
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

export default function FavoriteScreen() {
  const { favorites } = useFavorites();
  console.log(favorites);
  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <Text style={{ color: "white" }}>
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
