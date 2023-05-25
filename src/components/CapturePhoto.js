import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { launchCameraAsync } from 'expo-image-picker';
import * as ImagePicker from 'expo-image-picker';
import * as Camera from 'expo-camera';

export default function CapturePhoto() {
  const [selectedImage, setSelectedImage] = useState(null);

  const takePhoto = async () => {
    // Check camera permission
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      console.log('Camera permission denied');
      return;
    }

    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      maxWidth: 500,
      maxHeight: 500,
    };

    const result = await launchCameraAsync(options);

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  return (
    <View>
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
      )}
      <TouchableOpacity onPress={takePhoto}>
        <Text>Take Photo</Text>
      </TouchableOpacity>
    </View>
  );
}
