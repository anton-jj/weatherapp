import { text } from 'node:stream/consumers';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function FavoriteScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Favorite's</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingTop: 60
	},
	text: {
		color: "white",
	},
},)
