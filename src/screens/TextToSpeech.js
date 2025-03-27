import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker"; // Correct Picker import
import Slider from "@react-native-community/slider";  // Correct Slider import
import * as Speech from "expo-speech";

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en-US");
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);

  // Available languages
  const languages = [
    { label: "English (US)", value: "en-US" },
    { label: "English (UK)", value: "en-GB" },
    { label: "Spanish", value: "es-ES" },
    { label: "French", value: "fr-FR" },
    { label: "German", value: "de-DE" },
    { label: "Hindi", value: "hi-IN" },
    { label: "Japanese", value: "ja-JP" },
  ];

  const speakText = () => {
    if (text.trim() === "") {
      alert("Please enter some text to speak!");
      return;
    }

    const options = {
      language,
      pitch,
      rate,
    };

    Speech.speak(text, options);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Text to Speech</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter text here..."
        onChangeText={setText}
        value={text}
        multiline
      />

      {/* Language Picker */}
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

      {/* Pitch Control */}
      <Text style={styles.label}>Pitch: {pitch.toFixed(1)}</Text>
      <Slider
        minimumValue={0.5}
        maximumValue={2.0}
        step={0.1}
        value={pitch}
        onValueChange={(value) => setPitch(value)}
        style={styles.slider}
      />

      {/* Rate Control */}
      <Text style={styles.label}>Rate: {rate.toFixed(1)}</Text>
      <Slider
        minimumValue={0.5}
        maximumValue={2.0}
        step={0.1}
        value={rate}
        onValueChange={(value) => setRate(value)}
        style={styles.slider}
      />

      <Button title="Speak" onPress={speakText} color="#4CAF50" />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 20,
    textAlignVertical: "top",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 20,
  },
  slider: {
    marginBottom: 20,
  },
});

export default TextToSpeech;
