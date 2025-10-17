import { getWeather, weatherResult } from "@/api/weatherApi";
import { useThemeColor } from "@/hooks/use-theme-color";
import { loadSettings } from "@/utils/loadSettings";
import React, { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<weatherResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {}, [weather]);

  useEffect(() => {
    const fetchSettings = async () => {
		console.log(isCelsius)
      const isCelsius = await loadSettings();
      setIsCelsius(isCelsius);
    };
    fetchSettings();
  }, []);

  const convertTemp = (kelvin: number) => {
    if (isCelsius) {
      return Math.round(kelvin - 273.15);
    } else {
      return Math.round(((kelvin - 273.15) * 9) / 5 + 32);
    }
  };
  const fetchWeather = async () => {
    setLoading(true);
    const data = await getWeather({ city });
    setWeather(data);
    setLoading(false);
  };

  return (
    <View style={[styles.container, {backgroundColor}]}>
		<View style={styles.searchContainer}>
      <TextInput
	  style={[styles.input, {color: textColor}]}
        placeholder="Search for a city"
		placeholderTextColor={textColor}
        value={city}
        onChangeText={setCity}
        onSubmitEditing={fetchWeather}
        returnKeyType="search"
      />
      <Button title="search" onPress={fetchWeather} />

		</View>

      {weather && (
        <>
          <Text style={styles.text}>{weather?.cityName}</Text>
          <Text style={styles.text}>{weather?.description}</Text>
          <Text style={styles.text}>{convertTemp(weather.temp)}</Text>
          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${weather?.icon}@4x.png`,
            }}
            style={{ width: 150, height: 150 }}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 60,
  },
  text: { color: "white" },
  searchContainer: {
	flexDirection: "row", 
	gap: 10,
	marginBottom: 30,
  },
  input: {
	flex: 1,
	padding: 15,
	borderRadius: 8,
	fontSize: 15,
  }
});
