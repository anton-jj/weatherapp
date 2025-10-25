import { useTemp } from "@/hooks/use-temperature";
import { useThemeColor } from "@/hooks/use-theme-color";
import { loadSettings } from "@/utils/loadSettings";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { WeatherCard } from "@/components/weatherCard";
import { useWeather } from "@/stores/weatherStore";
import { IconSymbol } from "@/components/ui/icon-symbol.ios";
import { useFavorites } from "@/stores/useFavorites";

export default function HomeScreen() {
  const { loadFavorites } = useFavorites();
  const [city, setCity] = useState("");
  const {
    weather,
    isLoading,
    error,
    fetchWeatherByCity,
    fetchWeatherByCoords,
  } = useWeather();
  const { isCelsius } = useTemp();

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const hasError = error != null;

  useEffect(() => {
    const init = async () => {
      await loadSettings();
      await loadFavorites();
    };
    init();
  }, []);

  const convertTemp = (kelvin: number) => {
    if (isCelsius) {
      return Math.round(kelvin - 273.15);
    } else {
      return Math.round(((kelvin - 273.15) * 9) / 5 + 32);
    }
  };

  const handleSearch = async () => {
    if (!city.trim()) return;
    await fetchWeatherByCity(city);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { backgroundColor }]}>
        <View style={styles.searchContainer}>
          <TextInput
            style={[styles.input, { color: textColor }]}
            placeholder="Search for a city"
            placeholderTextColor={textColor}
            value={city}
            onChangeText={setCity}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <Button title="search" onPress={handleSearch} />
        </View>

        {hasError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Text style={{ color: textColor }}>
              Controll spelling or try use location instead
            </Text>
            <TouchableOpacity
              onPress={fetchWeatherByCoords}
              style={styles.locationButton}
            >
              <IconSymbol name="location.app.fill" color="tintColor" />
            </TouchableOpacity>
          </View>
        ) : isLoading ? (
          <ActivityIndicator
            size="large"
            color={tintColor}
            style={styles.loading}
          />
        ) : weather ? (
          <WeatherCard
            weather={weather}
            temp={convertTemp(weather.temp)}
            unit={isCelsius ? "celsius" : "fahrenheit"}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: textColor }]}>
              Search for a city or use your location
            </Text>
            <TouchableOpacity
              onPress={fetchWeatherByCoords}
              style={styles.locationButton}
            >
              <IconSymbol name="location.app.fill" color="tintColor" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  searchContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 30,
  },
  weatherContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    fontSize: 15,
  },
  cityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 10,
  },
  cityName: {
    fontSize: 28,
    fontWeight: 600,
  },
  weatherIcon: {
    width: 150,
    height: 150,
  },
  temp: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  desc: {
    fontSize: 14,
  },
  emptyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    justifyContent: "center",
    alignContent: "center",
  },
  locationButton: {
    marginLeft: 10,
    alignContent: "center",
  },
  loading: {
    margin: 50,
  },
  errorContainer: {
    alignItems: "center",
  },
  errorText: {
    fontWeight: 700,
    color: "#ffa500",
  },
});
