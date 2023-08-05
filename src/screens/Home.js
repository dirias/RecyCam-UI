import React from 'react';
import { SafeAreaView, Text, Image, StyleSheet } from 'react-native';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo}/>
      <Text style={styles.textFormat}>Versión beta 1.0.0</Text>
      <Text style={styles.textFormat}>Didier Irias & Jeffrey Baltodano</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  textFormat: {
    color: '#ffffff',
    marginTop: 10, // Add margin to separate text from logo
    fontSize: 18, // Increase font size for better readability
  },
  logo: {
    width: 250, // Adjust the width of the logo
    height: 250, // Maintain the aspect ratio
    marginBottom: 20, // Add margin at the bottom of the logo
  },
});






