import * as FileSystem from 'expo-file-system';

API_URL = 'http://192.168.0.6:8000/predict/'

const sendImageForPrediction = async (imageUri) => {
  try {

    // Send the image data to the backend for prediction
    console.log(imageUri)
    const formData = new FormData();
    const localImagePath = imageUri; // Use a local path
    formData.append('file', {
      uri: localImagePath, // Use the local file path
      name: 'tempImage.jpg',
      type: 'image/jpeg', // Adjust the image type accordingly
    });
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    const prediction = await response.json();
    return prediction;
  } catch (error) {
    console.error('Error sending image for prediction:', error);
    throw error;
  }
};

export default sendImageForPrediction;
