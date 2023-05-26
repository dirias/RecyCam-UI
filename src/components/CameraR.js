import React from 'react';
import { Camera } from 'expo-camera';
import { View, StyleSheet } from 'react-native';

export default function CameraR(props) {
  return (
    <View style={styles.cameraContainer}>
      <Camera
        style={ styles.camera } // Set flex: 1 to make it cover full width
        ref={(ref) => props.setCameraRef(ref)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
    cameraContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    camera: {
      width: '100%',
      height: '100%',
    }
  });