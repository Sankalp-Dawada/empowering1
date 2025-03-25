// src/components/HeaderNavigation.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalStyles from '../styles/GlobalStyles';
import Colors from '../constants/Colorss';

const HeaderNavigation = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={GlobalStyles.largeText} accessibilityLabel="Empowering App Logo">
          Empowering
        </Text>
      </View>
      <View style={styles.navContainer}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Home')}
          accessibilityRole="button"
          accessibilityLabel="Home"
        >
          <Text style={GlobalStyles.accessibleText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Features')}
          accessibilityRole="button"
          accessibilityLabel="Features"
        >
          <Text style={GlobalStyles.accessibleText}>Features</Text>
        </TouchableOpacity>
        {/* Add more navigation items */}
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
          accessibilityRole="button"
          accessibilityLabel="Login or Sign Up"
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.background,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginButton: {
    marginLeft: 15,
    backgroundColor: Colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  loginButtonText: {
    color: Colors.background,
    fontWeight: 'bold',
  },
});

export default HeaderNavigation;