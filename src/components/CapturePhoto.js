import React, { useState, useEffect } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation, useIsFocused} from '@react-navigation/native';
import { TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import CameraR from './CameraR';
import { Camera } from 'expo-camera';

export default function CapturePhoto() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
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
        //await MediaLibrary.saveToLibraryAsync(photo.uri);
        //console.log('Photo taken');
        navigation.navigate('Photo', { photoUri: photo.uri });
      } catch (error) {
        console.error('Error capturing photo:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      {isFocused && cameraReady && <CameraR setCameraRef={setCameraRef} />}
        <TouchableOpacity style={styles.buttonContainer} onPress={takePhoto} disabled={!cameraPermission || !mediaLibraryPermission || !cameraReady}>
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
    width: '100%',
    height: '95%',
    position: 'relative'
  },
  buttonContainer:{
    flex: 1,
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: -30,
  },
  captureIcon: {
    width: 45,
    height: 45,
    position: 'absolute',
    zIndex: 1
  },
});
