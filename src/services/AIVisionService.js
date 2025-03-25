import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as mobilenet from '@tensorflow-models/mobilenet';
import Tesseract from 'tesseract.js';
import { fetch } from '@tensorflow/tfjs-react-native';

// Load models once
let objectDetectionModel = null;

export const useAIVisionService = () => {
  
  // Load Object Detection Model (Mobile Compatible)
  const loadObjectDetectionModel = async () => {
    await tf.ready();  // Ensure TensorFlow is initialized
    if (!objectDetectionModel) {
      objectDetectionModel = await mobilenet.load();
    }
  };

  // Object Detection (React Native Compatible)
  const detectObjects = async (imageUri) => {
    if (!imageUri) return console.error("❌ No image provided!");

    try {
      await loadObjectDetectionModel();

      const response = await fetch(imageUri);
      const imageData = await response.arrayBuffer();
      const imageTensor = tf.node.decodeImage(new Uint8Array(imageData));

      const predictions = await objectDetectionModel.classify(imageTensor);
      console.log('🔍 Detected Objects:', predictions);

      tf.dispose(imageTensor); // Free memory
      return predictions;
    } catch (error) {
      console.error("⚠️ Object detection failed:", error);
      return null;
    }
  };

  // Text Recognition (OCR)
  const readText = async (imageUri) => {
    if (!imageUri) return console.error("❌ No image provided!");

    try {
      const { data: { text } } = await Tesseract.recognize(imageUri, 'eng', {
        logger: (m) => console.log(m),  // Logs progress
      });

      console.log('📝 Extracted Text:', text);
      return text;
    } catch (error) {
      console.error("⚠️ OCR failed:", error);
      return null;
    }
  };

  // Color Recognition (Placeholder)
  const identifyColors = async (imageUri) => {
    console.log('🎨 Color Recognition is not implemented yet.');
    return "Feature Coming Soon!";
  };

  return { detectObjects, readText, identifyColors };
};
