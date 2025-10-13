import { text } from 'node:stream/consumers';
import { Text, View, StyleSheet } from 'react-native'
import { getWheater, WheatherResult } from '@/api/wheaterApi';

async function logRes() {
	const weather: WheatherResult = await getWheater({city:"London"})
	console.log(weather.cityName)
	console.log(weather.icon)
	console.log(weather.temp)
	console.log(weather.description)
	
}
export default function HomeScreen() {
	logRes()
  return (
		<View style={styles.container}>
				<Text style={styles.text}>Homescreen </Text>
		</View>
  );
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
