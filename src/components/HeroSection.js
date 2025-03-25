// src/components/HeroSection.js
import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  Dimensions 
} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import Colors from '../constants/Colorss';

const { width } = Dimensions.get('window');

const HeroSection = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.headline}>Breaking Barriers with AI:</Text>
        <Text style={styles.subheadline}>Empowering Everyone!</Text>
        <Text style={styles.description}>
          Experience AI-driven assistive technology for an inclusive digital world.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={GlobalStyles.button}
            onPress={() => navigation.navigate('Features')}
          >
            <Text style={GlobalStyles.buttonText}>Explore Features</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[GlobalStyles.button, styles.secondaryButton]}
            onPress={() => navigation.navigate('AIAssistance')}
          >
            <Text style={GlobalStyles.buttonText}>Try AI Assistance</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.imageContainer}>
        <Image 
          source={require('../assets/favicon.png')} 
          style={styles.heroImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10, // Reduced padding to make the section smaller
    backgroundColor: Colors.accessibleGray,
  },
  textContainer: {
    flex: 1,
    paddingRight: 10, // Reduced padding for a compact look
  },
  headline: {
    ...GlobalStyles.largeText,
    fontSize: 24, // Reduced font size slightly
    marginBottom: 5,
  },
  subheadline: {
    ...GlobalStyles.largeText,
    color: Colors.primary,
    fontSize: 20, // Reduced font size
    marginBottom: 10,
  },
  description: {
    ...GlobalStyles.accessibleText,
    fontSize: 14, // Made text smaller
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  secondaryButton: {
    backgroundColor: Colors.secondary,
    marginLeft: 8,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImage: {
    width: width * 0.3, // Reduced width (previously 0.4)
    height: width * 0.3, // Reduced height
  },
});

export default HeroSection;
