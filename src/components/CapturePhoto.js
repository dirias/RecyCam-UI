import React, { useState, useEffect } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { TouchableOpacity, Text, View } from 'react-native';
import ImageTaken from './ImageTaken';
import CameraR from './CameraR';
import { Camera } from 'expo-camera';

export default function CapturePhoto() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
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
      <CameraR setCameraRef={setCameraRef} />
      <ImageTaken selectedImage={selectedImage} />
      <TouchableOpacity onPress={takePhoto}>
        <Text>Take Photo</Text>
      </TouchableOpacity>
    </View>
  );
}
