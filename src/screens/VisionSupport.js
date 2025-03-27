import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, ActivityIndicator, ScrollView, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// Change this line in VisionSupport.js
import { useAIVisionService } from '../services/AIVisionService';  // Correct path


const VisionSupportScreen = () => {
    const { detectObjects } = useAIVisionService();
    const [imageUri, setImageUri] = useState(null);
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(false);

    // ✅ Request camera permissions with better handling
    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Camera access is required for image selection.');
            }
        })();
    }, []);

    // 📷 Pick Image Function
    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                setImageUri(result.assets[0].uri);
                setPredictions([]);  // Clear previous predictions
            }
        } catch (error) {
            console.error("⚠️ Error picking image:", error);
            Alert.alert('Error', 'Failed to pick image.');
        }
    };

    // 🚀 Run Object Detection
    const handleDetection = async () => {
        if (!imageUri) {
            Alert.alert("No Image Selected", "Please select an image first.");
            return;
        }

        setLoading(true);
        const results = await detectObjects(imageUri);

        if (results && results.length > 0) {
            // Filter low-confidence predictions (below 30%)
            const filteredResults = results.filter(p => p.probability > 0.3);
            setPredictions(filteredResults);
        } else {
            Alert.alert("No Objects Detected", "Try with a clearer image.");
        }

        setLoading(false);
    };

    const clearImage = () => {
        setImageUri(null);
        setPredictions([]);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>AI Vision Support</Text>

            <Button title="Pick an Image" onPress={pickImage} />

            {imageUri && (
                <>
                    <Image source={{ uri: imageUri }} style={styles.image} />
                    <View style={styles.buttonContainer}>
                        <Button title="Detect Objects" onPress={handleDetection} />
                        <Button title="Clear" color="red" onPress={clearImage} />
                    </View>
                </>
            )}

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                predictions.length > 0 && (
                    <View style={styles.predictionContainer}>
                        <Text style={styles.predictionTitle}>Detected Objects:</Text>
                        {predictions.map((p, index) => (
                            <Text key={index} style={styles.predictionText}>
                                {p.className} ({Math.round(p.probability * 100)}%)
                            </Text>
                        ))}
                    </View>
                )
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    image: { width: '100%', height: 300, marginVertical: 10 },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
    predictionContainer: { marginTop: 20 },
    predictionTitle: { fontSize: 18, fontWeight: 'bold' },
    predictionText: { fontSize: 16, color: '#333' },
});

export default VisionSupportScreen;
