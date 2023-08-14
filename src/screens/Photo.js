import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

export default function Photo({ route }) {
  const { photoUri, prediction } = route.params;
  console.log(prediction)
  let predictionResult = prediction['predicted_classes']
  let advice = ""
  let color = ''
  if (predictionResult === 'Aceptable'){
    color = 'green'
    advice = "Tú desecho está listo para ser reciclado, buen trabajo."
  } else {
    color = 'red'
    advice = "Antes de reciclar tu desecho necesitas limpiarlo y quitar materiales adicionales, prepara tú desecho e intenta de nuevo."
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#111111'
    },
    title: {
      color: '#fff',
      fontWeight: '500',
      fontSize: 25,
      top: -40
    },
    text: {
      color: color,
      fontSize: 25,
      top: 20,
    },
    smallText: {
      color: '#fff',
      fontSize: 15,
      top: -40,
      width: '80%',
      padding: 5,
      backgroundColor: '#111'
    },
    advice: {
      color: '#111',
      fontSize: 20,
      top: 40,
      left: 3,
      right: 3,
      backgroundColor: '#fff',
      padding: 5,
      borderRadius: 5
    },
    image: {
      width: '80%',
      height: '40%',
      borderRadius: 5
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultado de las predicciones</Text>
      <Image source={{ uri: photoUri }} style={styles.image} />
      <Text style={styles.smallText}>Aceptable: {prediction['predictions'][1].toFixed(2)}%   -   No Aceptable: {prediction['predictions'][0].toFixed(2)}%</Text>
      <Text style={styles.text}>{predictionResult}</Text>
      <Text style={styles.advice}>{advice}</Text>
    </View>
  );
}
