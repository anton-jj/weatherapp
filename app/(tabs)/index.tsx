import { text } from 'node:stream/consumers';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native'
import { addFavorite, getWeather, loadFavorites, weatherResult } from '@/api/weatherApi';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function logRes() {
	const weather: weatherResult = await getWeather({city:"London"})
	AsyncStorage.removeItem("favorites")
	let fav =  await loadFavorites()
	console.log(fav)
	addFavorite("new york")
	fav =  await loadFavorites()
	console.log(fav)

}
export default function HomeScreen() {
	const [city, setCity] = useState("")
	const [weather, setWeather] = useState<weatherResult | null>(null)


	const fetchWeather = async () => {
			const data = await getWeather({city})
			setWeather(data)
	}


	return (
	<View style={styles.container}>
		<TextInput
			placeholder="choose a city"
			value={city}
			onChangeText={setCity}
			onSubmitEditing={fetchWeather}
			returnKeyType="search"
		/> 	
	<Button title="search" onPress={fetchWeather}/>

	<View>
		<Text style={styles.text}>{weather?.cityName}</Text>
		<Text style={styles.text}>{weather?.temp}</Text>
		<Text style={styles.text}>{weather?.description}</Text>
		<Text style={styles.text}>{weather?.icon}</Text>
	</View>
	</View>
	)
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
    alignItems: 'center',
		justifyContent: 'flex-start',
		paddingTop: 60,
  },
	text: {color: 'white' }
});
