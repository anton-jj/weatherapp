import { text } from 'node:stream/consumers';
import { Text, View, StyleSheet } from 'react-native'

export default function HomeScreen() {
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
