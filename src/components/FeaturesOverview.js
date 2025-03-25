import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../constants/Colorss';

const FeatureItem = ({ icon, title, description, screen }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity 
      style={styles.featureItem} 
      onPress={() => navigation.navigate(screen)}
    >
      <Icon name={icon} size={50} color={Colors.primary} style={styles.featureIcon} />
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </TouchableOpacity>
  );
};

const FeaturesOverview = () => {
  const features = [
    {
      icon: 'record-voice-over',
      title: 'Speech to Text',
      description: 'Converts speech into written text.',
      screen: 'SpeechToText'
    },
    {
      icon: 'hearing',
      title: 'Text to Speech',
      description: 'Reads out text for better accessibility.',
      screen: 'TextToSpeech'
    },
    {
      icon: 'navigation',
      title: 'Navigation Assistance',
      description: 'Helps users with movement guidance.',
      screen: 'NavigationAssistance'
    },
    {
      icon: 'visibility',
      title: 'Visual Challenges Assistance',
      description: 'Supports users with visual impairments.',
      screen: 'VisualChallenging'
    },
    {
      icon: 'psychology',
      title: 'Brain-Computer Interface',
      description: 'Communication through brain signals.',
      screen: 'BCICommunication'
    },
    {
      icon: 'school',
      title: 'Learning Challenges',
      description: 'Assistive tech for learning disabilities.',
      screen: 'LearningChallenges'
    },
    {
      icon: 'emergency',
      title: 'Emergency Support',
      description: 'Quick help for emergency situations.',
      screen: 'EmergencySupportScreen'
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Assistive AI Features</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuresContainer}>
        {features.map((feature, index) => (
          <FeatureItem 
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            screen={feature.screen}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.background,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default FeaturesOverview;
