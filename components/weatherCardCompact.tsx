import { useThemeColor } from "@/hooks/use-theme-color";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { IconSymbol } from "./ui/icon-symbol.ios";

interface WeatherCardCompactProp {
  city: string;
  onSelect: () => void;
  onRemove: () => void;
  isSelected: boolean;
}

export function WeatherCardCompact({
  city,
  onSelect,
  onRemove,
  isSelected,
}: WeatherCardCompactProp) {
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const cardBg = "rgba(32, 47, 48, 0.5)";

  return (
    <View style={[styles.card, { backgroundColor: cardBg }]}>
      <Text style={[styles.cityName, { color: textColor }]}>
        {city.charAt(0).toUpperCase() + city.slice(1)}
      </Text>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.selectButton} onPress={onSelect}>
          {isSelected ? (
            <IconSymbol name="checkmark.circle" color={tintColor} />
          ) : (
            <IconSymbol name="circle" color={tintColor} />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
          <IconSymbol name="heart.slash" color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  selectText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  removeButton: {
    padding: 8,
  },
});
