import { AWS } from 'aws-sdk';


sendImageToRekognition = (base64Image) => {
    const rekognition = new AWS.Rekognition();
  
    const params = {
      Image: {
        Bytes: Buffer.from(base64Image, 'base64'),
      },
      MaxLabels: 10,
      MinConfidence: 70,
    };
  
    rekognition.detectLabels(params, (err, data) => {
      if (err) {
        console.log('Error detecting labels:', err);
      } else {
        console.log('Detected Labels:', data.Labels);
      }
    });
  };
  