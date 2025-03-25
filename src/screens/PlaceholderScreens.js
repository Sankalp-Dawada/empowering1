// src/screens/PlaceholderScreens.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FeaturesScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>App Features</Text>
      <Text style={styles.description}>
        Detailed information about Empowering App's assistive technologies
      </Text>
    </SafeAreaView>
  );
};

const AIAssistanceScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>AI Assistance</Text>
      <Text style={styles.description}>
        Explore our AI-powered assistive technologies
      </Text>
    </SafeAreaView>
  );
};

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.description}>
        Access your Empowering App account
      </Text>
    </SafeAreaView>
  );
};

const SupportScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Support</Text>
      <Text style={styles.description}>
        Get help and support for Empowering App
      </Text>
    </SafeAreaView>
  );
};

const PrivacyPolicyScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.description}>
        Our commitment to user privacy and data protection
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export { 
  FeaturesScreen, 
  AIAssistanceScreen, 
  LoginScreen, 
  SupportScreen, 
  PrivacyPolicyScreen 
};