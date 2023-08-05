import React, { useState, useEffect } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import ImageTaken from './ImageTaken';
import CameraR from './CameraR';
import { Camera } from 'expo-camera';

export default function CapturePhoto() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [mediaLibraryPermission, setMediaLibraryPermission] = useState(null);
  const [cameraReady, setCameraReady] = useState(false); // Initialize as false
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(cameraStatus.status === 'granted');

      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      setMediaLibraryPermission(mediaLibraryStatus.status === 'granted');

      // Set cameraReady to true when camera permissions are granted
      if (cameraStatus.status === 'granted') {
        setCameraReady(true);
      }
    })();
  }, []);

  const takePhoto = async () => {
    console.log('clicked')
    console.log('Camera Permissions', cameraPermission)
    console.log('Media Library Permissions', mediaLibraryPermission)
    console.log('Camera Ready', cameraReady)
    if (!cameraPermission || !mediaLibraryPermission || !cameraReady) {
      console.log('Permissions or camera not ready');
      return;
    }
    console.log('Camera Ref', cameraRef)
    if (cameraRef) {
      try {
        const photo = await cameraRef.takePictureAsync();
        console.log('Photo captured:', photo);
        setSelectedImage(photo.uri);
        await MediaLibrary.saveToLibraryAsync(photo.uri);
        console.log('Photo taken');
      } catch (error) {
        console.error('Error capturing photo:', error);
      }
    }
  };

  return (
    <View >
      {cameraReady && <CameraR setCameraRef={setCameraRef} />}
      <ImageTaken selectedImage={selectedImage} />
      <TouchableOpacity onPress={takePhoto} disabled={!cameraPermission || !mediaLibraryPermission || !cameraReady}>
        <Image
          source={require("../assets/photoButton.png")}
          style={styles.captureIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  captureIcon: {
    width: 45,
    height: 45,
    position: 'absolute',
    zIndex: 1 
  },
});
