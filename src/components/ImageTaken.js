import React from 'react';

import { View, Image } from 'react-native';

export default function ImageTaken( props ) {
  return (
    <View>
      {props.selectedImage && (
        <Image source={{ uri: props.selectedImage }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}