import React, { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { TouchableOpacity, Text, View, Image } from 'react-native';

export default function CapturePhoto() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === 'granted');
    })();
  }, []);

  const takePhoto = async () => {
    if (!cameraPermission) {
      console.log('Camera permission denied');
      return;
    }

    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setSelectedImage(photo.uri);
      // Save the photo to the device's media library
      await MediaLibrary.saveToLibraryAsync(photo.uri);
    }
  };

  return (
    <View>
      <Camera
        style={{ width: 200, height: 200 }}
        ref={(ref) => setCameraRef(ref)}
      />
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
      )}
      <TouchableOpacity onPress={takePhoto}>
        <Text>Take Photo</Text>
      </TouchableOpacity>
    </View>
  );
}
