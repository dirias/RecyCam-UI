import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

import { Buffer } from 'buffer';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

const MODEL_URL = 'https://dirias.github.io/RecyCam-API/model/model.json';

const loadModel = async () => {
  try {
    await tf.ready();
    const model = await tf.loadLayersModel(MODEL_URL);
    console.log('Model loaded successfully');
    return model;
  } catch (error) {
    console.error('Error loading model:', error);
    throw error;
  }
};


const preprocessImage = async (imageUri, inputShape) => {
    try {
      const imageByte = await convertImageToByteArray(imageUri);
      console.log('Image byte array length:', imageByte.length);
  
      // Create a rank-3 tensor from the byte data
      const tensor = tf.tensor(new Uint8Array(imageByte), inputShape);
  
      // Resize the tensor to match the input shape of the model
      const resizedTensor = tf.image.resizeBilinear(tensor, [inputShape[0], inputShape[1]]);
  
      // Normalize the pixel values to a range of [0, 1]
      const normalizedTensor = resizedTensor.toFloat().div(255);
  
      // Expand dimensions to match the batch size (if needed)
      const preprocessedTensor = normalizedTensor.expandDims();
  
      return preprocessedTensor;
    } catch (error) {
      console.error('Error preprocessing image:', error);
      throw error;
    }
  };
  
  const resizeImage = async (imageUri, targetSize) => {
    try {
      const resizedImage = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: targetSize[1], height: targetSize[0] } }],
        { format: 'png', compress: 1 } // You can adjust the format and compression options as needed
      );
  
      return resizedImage;
    } catch (error) {
      console.error('Error resizing image:', error);
      throw error;
    }
  };
  
  const convertImageToByteArray = async (imageUri) => {
    try {
      // Read the image file as an array buffer
      const arrayBuffer = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      // Convert array buffer to byte array using Buffer
      const byteArray = new Uint8Array(Buffer.from(arrayBuffer, 'base64'));
  
      return byteArray;
    } catch (error) {
      console.error('Error converting image to byte array:', error);
      throw error;
    }
  };
  


const predictImage = async (model, image) => {
  try {

    const resizedImageUri = await resizeImage(image, [224, 224]);
    console.log('Resized image URI:', resizedImageUri);

    const preprocessedTensor = await preprocessImage(resizedImageUri, [224, 224]);
    console.log('Preprocessed tensor:', preprocessedTensor);
    

    const predictions = await model.predict(preprocessedTensor).data();
    console.log('Predictions:', predictions);

    const formattedPredictions = predictions
      .map((value, index) => `Class ${index}: ${value.toFixed(2)}`)
      .join('\n');
    console.log('Formatted predictions:', formattedPredictions);
    return formattedPredictions;
  } catch (error) {
    console.error('Error predicting image:', error);
    throw error;
  }
};

export const runPrediction = async (selectedImage) => {
  console.log('Predicting', selectedImage);
  const model = await loadModel();
  console.log('Model', model);
  return predictImage(model, selectedImage);
};
