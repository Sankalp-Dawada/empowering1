import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";

const SpeechToText = () => {
  const [recognizedText, setRecognizedText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [language, setLanguage] = useState("en");
  const recordingRef = useRef(null);

  // ✅ Replace with your AssemblyAI API Key
  const API_KEY = "d14b29d04ec54b25b63cd59f2501fc46";

  const languages = [
    { label: "English", value: "en" },
    { label: "Spanish", value: "es" },
    { label: "French", value: "fr" },
    { label: "Hindi", value: "hi" },
    { label: "Chinese", value: "zh-CN" },
  ];

  // ✅ Cleanup effect to avoid memory leaks
  useEffect(() => {
    return () => {
      if (recordingRef.current) {
        recordingRef.current.stopAndUnloadAsync().catch(() => {});
        recordingRef.current = null;
      }
    };
  }, []);

  // ✅ Start Recording Function with Updated Audio Settings
  const startRecording = async () => {
    if (isRecording) return;

    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Please grant audio permissions.");
        return;
      }

      // ✅ Ensure previous recording is cleared
      if (recordingRef.current) {
        await recordingRef.current.stopAndUnloadAsync();
        recordingRef.current = null;
      }

      setIsRecording(true);

      const recording = new Audio.Recording();
      
      await recording.prepareToRecordAsync({
        isMeteringEnabled: true,
        android: {
          extension: ".m4a",
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: ".m4a",
          outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        }
      });

      await recording.startAsync();
      recordingRef.current = recording;
      console.log("Recording started...");

    } catch (error) {
      console.error("Recording Error:", error);
      Alert.alert("Error", "Failed to start recording.");
      setIsRecording(false);
    }
  };

  // ✅ Stop Recording & Transcribe
  const stopRecording = async () => {
    if (!isRecording || !recordingRef.current) return;

    try {
      console.log("Stopping recording...");
      await recordingRef.current.stopAndUnloadAsync();

      const uri = recordingRef.current.getURI();
      recordingRef.current = null;
      setIsRecording(false);

      if (uri) {
        await transcribeAudio(uri);
      }
    } catch (error) {
      console.error("Stop Recording Error:", error);
      Alert.alert("Error", "Failed to stop recording.");
      setIsRecording(false);
    }
  };

  // ✅ Upload Audio with Correct MIME Type
  const uploadAudio = async (fileUri) => {
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: fileUri,
        type: "audio/m4a",  // ✅ Use correct MIME type
        name: "recording.m4a",
      });

      const response = await axios.post(
        "https://api.assemblyai.com/v2/upload",
        formData,
        {
          headers: {
            Authorization: API_KEY,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.upload_url;

    } catch (error) {
      console.error("Upload Error:", error);
      Alert.alert("Upload Failed", "Error uploading audio.");
      return null;
    }
  };

  // ✅ Transcribe Audio
  const transcribeAudio = async (uri) => {
    try {
      const audioUrl = await uploadAudio(uri);

      if (!audioUrl) return;

      const response = await axios.post(
        "https://api.assemblyai.com/v2/transcript",
        { audio_url: audioUrl },
        {
          headers: {
            Authorization: API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      const transcriptId = response.data.id;
      let status = "queued";

      while (status !== "completed") {
        const transcriptResponse = await axios.get(
          `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
          {
            headers: { Authorization: API_KEY },
          }
        );

        status = transcriptResponse.data.status;

        if (status === "completed") {
          setRecognizedText(transcriptResponse.data.text);
          translateText(transcriptResponse.data.text);
        }

        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    } catch (error) {
      console.error("Transcription Error:", error);
      Alert.alert("Error", "Failed to transcribe audio.");
    }
  };

  // ✅ Translate Text
  const translateText = async (text) => {
    setIsTranslating(true);
    try {
      const response = await axios.post(
        `https://api.mymemory.translated.net/get?q=${text}&langpair=en|${language}`
      );

      const translated = response.data.responseData.translatedText;
      setTranslatedText(translated);

    } catch (error) {
      console.error("Translation Error:", error);
      Alert.alert("Error", "Failed to translate text.");
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>🎙️ Multilingual Speech-to-Text</Text>

      <Text style={styles.label}>Select Language:</Text>
      <Picker
        selectedValue={language}
        onValueChange={(itemValue) => setLanguage(itemValue)}
        style={styles.picker}
      >
        {languages.map((lang) => (
          <Picker.Item key={lang.value} label={lang.label} value={lang.value} />
        ))}
      </Picker>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.recordButton}
          onPress={isRecording ? stopRecording : startRecording}
          disabled={isRecording}
        >
          <Text style={styles.buttonText}>
            {isRecording ? "⏹️ Stop Recording" : "🎤 Start Recording"}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Recognized Text:</Text>
      <TextInput style={styles.input} value={recognizedText} editable={false} multiline />

      <Text style={styles.label}>Translated Text:</Text>
      {isTranslating ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TextInput style={styles.input} value={translatedText} editable={false} multiline />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#f5f5f5" },
  heading: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 5 },
  input: { height: 100, borderColor: "#ccc", borderWidth: 1, padding: 10, marginBottom: 20 },
  recordButton: { backgroundColor: "#1E90FF", padding: 15, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default SpeechToText;
