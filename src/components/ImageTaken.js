import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function ImageTaken({ selectedImage, predictImage }) {

  return (
    <View style={styles.container}>
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
      <Text>{prediction}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});
