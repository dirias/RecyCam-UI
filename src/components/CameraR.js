import React from 'react';
import { Camera } from 'expo-camera';
import { View } from 'react-native';

export default function CameraR(props) {
  return (
    <View>
      <Camera
        style={{ width: 200, height: 200 }}
        ref={(ref) => props.setCameraRef(ref)}
      />
    </View>
  );
}
