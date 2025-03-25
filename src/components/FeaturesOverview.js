// src/components/FeaturesOverview.js
import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GlobalStyles from '../styles/GlobalStyles';
import Colors from '../constants/Colorss';

const FeatureItem = ({ icon, title, description }) => (
  <View 
    style={styles.featureItem}
    accessibilityRole="button"
    accessibilityLabel={`${title} Feature: ${description}`}
  >
    <Icon 
      name={icon} 
      size={50} 
      color={Colors.primary} 
      style={styles.featureIcon}
    />
    <Text style={styles.featureTitle}>{title}</Text>
    <Text style={styles.featureDescription}>{description}</Text>
  </View>
);

const FeaturesOverview = ({ navigation }) => {
  const features = [
    {
      icon: 'visibility',
      title: 'AI-Powered Screen Reader',
      description: 'Converts text to speech for visually impaired users'
    },
    {
      icon: 'text-format',
      title: 'Braille Translator',
      description: 'Translates digital text into Braille format'
    },
    {
      icon: 'camera-alt',
      title: 'AI Object Recognition',
      description: 'Identifies objects and surroundings via camera input'
    },
    {
      icon: 'memory',
      title: 'Brain-Computer Interface',
      description: 'Enables communication through brain signals'
    },
    {
      icon: 'record-voice-over',
      title: 'Real-Time Voice Assistance',
      description: 'Helps users interact with digital world effortlessly'
    }
  ];

  return (
    <View style={styles.container}>
      <Text 
        style={styles.sectionTitle}
        accessibilityRole="header"
      >
        Our Core Features
      </Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.featuresContainer}
      >
        {features.map((feature, index) => (
          <FeatureItem 
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </ScrollView>
      
      <TouchableOpacity 
        style={GlobalStyles.button}
        onPress={() => navigation.navigate('FeaturesDetail')}
        accessibilityRole="button"
        accessibilityLabel="Learn More About Our Assistive AI"
      >
        <Text style={GlobalStyles.buttonText}>Learn More About Our Assistive AI</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.background,
  },
  sectionTitle: {
    ...GlobalStyles.largeText,
    textAlign: 'center',
    marginBottom: 20,
  },
  featuresContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  featureItem: {
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 15,
    backgroundColor: Colors.accessibleGray,
    borderRadius: 10,
    width: 200,
  },
  featureIcon: {
    marginBottom: 10,
  },
  featureTitle: {
    ...GlobalStyles.accessibleText,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  featureDescription: {
    ...GlobalStyles.accessibleText,
    textAlign: 'center',
    fontSize: 14,
  },
});

export default FeaturesOverview;