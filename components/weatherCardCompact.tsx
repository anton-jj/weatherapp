import React, { useEffect } from "react";
import { getWeather, weatherResult } from "@/api/weatherApi";
import { useThemeColor } from "@/hooks/use-theme-color";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

interface WeatherCardCompactProp {
  city: string;
  onSelect: () => void;
  onRemove: () => void;
}

export function WeatherCardCompact({
  city,
  onSelect,
  onRemove,
}: WeatherCardCompactProp) {
  const textColor = useThemeColor({}, "text");
  const cardBg = "rgba(32, 47, 48, 0.5)";

  return (
    <View style={[styles.card, { backgroundColor: cardBg }]}>
      <Text style={[styles.cityName, { color: textColor }]}>
        {city.charAt(0).toUpperCase() + city.slice(1)}
      </Text>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.selectButton} onPress={onSelect}>
          <Text style={styles.selectText}>O</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
          <Text style={styles.removeText}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: 20,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cityName: {
    fontSize: 18,
    fontWeight: "500",
  },
  buttons: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  selectButton: {
    backgroundColor: "rgba(100, 150, 255, 0.8)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  selectText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  removeButton: {
    padding: 8,
  },
  removeText: {
    fontSize: 20,
    color: "#ff6b6b",
  },
});
