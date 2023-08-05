import React, { useState, useEffect } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import ImageTaken from './ImageTaken';
import CameraR from './CameraR';
import { Camera } from 'expo-camera';

export default function CapturePhoto() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(cameraStatus.status === 'granted');

      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      console.log(mediaLibraryStatus)
      if (mediaLibraryStatus.status !== 'granted') {
        console.log('Media library permission denied');
      }
    })();
  }, []);

  const takePhoto = async () => {
    console.log('Button clicked');
    if (!cameraPermission) {
      console.log('Camera permission denied');
      return;
    }

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
    <View style={styles.container}>
      <CameraR setCameraRef={setCameraRef} />
      <ImageTaken selectedImage={selectedImage} />
      <TouchableOpacity onPress={takePhoto}>
        <Image
          source={require("../assets/photoButton.png")}
          style={styles.captureIcon}
        />
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    width:'100%',
    height: '100%',
    alignItems: 'center',
  },
  captureIcon: {
    width: 75,
    height: 75,
    bottom: 80,
  },
});
