// useEmergencyAlert.js
import { useState } from 'react';
import * as Location from 'expo-location';
import * as SMS from 'expo-sms';
import { Alert, Linking } from 'react-native';

export const useEmergencyAlert = () => {
  const [emergencyContacts, setEmergencyContacts] = useState([]);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') throw new Error('Location permission denied');

      const location = await Location.getCurrentPositionAsync({});
      console.log('Location Data:', location);
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Could not fetch location. Please enable GPS.');
      return null;
    }
  };

  const triggerEmergencyAlert = async (options = {}) => {
    try {
      const location = options.location ? await getCurrentLocation() : null;

      // Iterate over the emergencyContacts list and send SMS
      emergencyContacts.forEach(contact => {
        const message = `🚨 EMERGENCY ALERT 🚨\n${options.message || 'Need Immediate Help'}\n${
          location ? `📍 Location: https://www.google.com/maps?q=${location.latitude},${location.longitude}` : ''
        }`;
        sendSMS(contact.phone, message);
      });

      // Optional: trigger an emergency call (e.g., 911)
      try {
        Linking.openURL('tel:911');
      } catch (error) {
        Alert.alert('Error', 'Could not make an emergency call.');
      }

      Alert.alert('Emergency Alert Sent', 'Contacts and emergency services have been notified.');
    } catch (error) {
      console.error('Emergency alert failed:', error);
      Alert.alert('Error', 'Could not send emergency alert.');
    }
  };

  return { triggerEmergencyAlert, setEmergencyContacts };
};

// Function to send SMS using expo-sms
const sendSMS = async (phoneNumber, message) => {
  const isAvailable = await SMS.isAvailableAsync();
  if (isAvailable) {
    await SMS.sendSMSAsync([phoneNumber], message);
  } else {
    Alert.alert('Error', 'SMS service is not available on this device.');
  }
};

export default useEmergencyAlert;
