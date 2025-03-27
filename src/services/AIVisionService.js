import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as ImageManipulator from 'expo-image-manipulator';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';
import Tts from 'react-native-tts';

let objectDetectionModel = null;

export const useAIVisionService = () => {

    const loadObjectDetectionModel = async () => {
        try {
            await tf.ready();
            if (!objectDetectionModel) {
                objectDetectionModel = await mobilenet.load();
                console.log("✅ Model loaded successfully!");
            }
        } catch (error) {
            console.error("⚠️ Error loading model:", error);
        }
    };

    const detectObjects = async (imageUri) => {
        if (!imageUri) {
            console.error("❌ No image provided!");
            return [];
        }

        try {
            await loadObjectDetectionModel();

            // 🛠️ Resize image to 224x224 (MobileNet requirement)
            const resizedImage = await ImageManipulator.manipulateAsync(
                imageUri,
                [{ resize: { width: 224, height: 224 } }],
                { base64: true }
            );

            const response = await fetch(resizedImage.uri);
            const imageData = await response.arrayBuffer();
            const imageTensor = decodeJpeg(new Uint8Array(imageData));

            // 🚀 Perform Object Detection
            const predictions = await objectDetectionModel.classify(imageTensor);

            console.log('🔍 Detected Objects:', predictions);

            // 🎯 Filter low-confidence predictions (below 30%)
            const filteredPredictions = predictions.filter(p => p.probability > 0.3);

            if (filteredPredictions.length > 0) {
                const detectedObjects = filteredPredictions.map(p =>
                    `${p.className} (${Math.round(p.probability * 100)}%)`
                ).join(', ');

                Tts.speak(`Detected: ${detectedObjects}`);
            } else {
                Tts.speak('No high-confidence objects detected.');
            }

            // 🔥 Dispose tensor to free memory
            tf.dispose(imageTensor);

            return filteredPredictions;

        } catch (error) {
            console.error("⚠️ Object detection failed:", error);
            return [];
        }
    };

    return { detectObjects };
};
