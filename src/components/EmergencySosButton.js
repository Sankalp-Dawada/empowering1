// src/components/EmergencySosButton.js
import React, { useState } from 'react';
import { 
  TouchableOpacity, 
  View, 
  Text, 
  StyleSheet,
  Vibration 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useEmergencyAlert } from '../hooks/useEmergencyAlert';

const EmergencySosButton = () => {
  const [isPressed, setIsPressed] = useState(false);
  const { triggerEmergencyAlert } = useEmergencyAlert();

  const handleEmergencyPress = () => {
    // Vibrate to provide tactile feedback
    Vibration.vibrate([0, 500, 100, 500]);
    
    // Trigger emergency alert
    triggerEmergencyAlert({
      message: 'Emergency assistance requested',
      location: true // Get current GPS location
    });

    // Visual feedback
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 2000);
  };

  return (
    <TouchableOpacity 
      style={[
        styles.sosButton, 
        isPressed && styles.sosButtonPressed
      ]}
      onPress={handleEmergencyPress}
      accessibilityRole="button"
      accessibilityLabel="Emergency SOS Button"
    >
      <Icon 
        name="alert-circle" 
        size={40} 
        color="#FFFFFF" 
      />
      <Text style={styles.sosButtonText}>
        SOS Emergency
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sosButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#FF3B30',
    borderRadius: 50,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  sosButtonPressed: {
    transform: [{ scale: 0.9 }],
    opacity: 0.7
  },
  sosButtonText: {
    color: '#FFFFFF',
    marginLeft: 10,
    fontWeight: 'bold'
  }
});

export default EmergencySosButton;