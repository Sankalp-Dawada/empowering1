import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const HomeScreen = ({ navigation }) => {
  const features = [
    { 
      icon: 'eye', 
      title: 'AI-Powered Screen Reader', 
      description: 'Converts text to speech for visually impaired users' 
    },
    { 
      icon: 'braille', 
      title: 'Braille Translator', 
      description: 'Translates digital text into Braille format' 
    },
    { 
      icon: 'camera', 
      title: 'AI Object Recognition', 
      description: 'Identifies objects and surroundings via camera input' 
    },
    { 
      icon: 'brain', 
      title: 'Brain-Computer Interface', 
      description: 'Enables communication through brain signals' 
    },
    { 
      icon: 'microphone', 
      title: 'Real-Time Voice Assistance', 
      description: 'Helps users interact with digital world effortlessly' 
    }
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Breaking Barriers with AI</Text>
        <Text style={styles.heroSubtitle}>Empowering Everyone!</Text>
        <Text style={styles.heroDescription}>
          Experience AI-driven assistive technology for an inclusive digital world.
        </Text>
        <View style={styles.ctaContainer}>
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={() => navigation.navigate('Features')}
          >
            <Text style={styles.ctaButtonText}>Explore Features</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.ctaButtonOutline}
            onPress={() => navigation.navigate('Assistance')}
          >
            <Text style={styles.ctaButtonOutlineText}>Try AI Assistance</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Features Overview */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Our Core Features</Text>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Icon name={feature.icon} size={30} color="#3498db" />
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* How It Works */}
      <View style={styles.howItWorksSection}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        {['Choose Assistance Type', 'Interact with AI', 'Enhance Accessibility', 'Stay Connected'].map((step, index) => (
          <View key={index} style={styles.stepItem}>
            <Text style={styles.stepNumber}>{index + 1}</Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>

      {/* Community Section */}
      <View style={styles.communitySection}>
        <Text style={styles.sectionTitle}>Join Our Community</Text>
        <Text style={styles.communityDescription}>
          Connect with users, developers, and accessibility advocates
        </Text>
        <TouchableOpacity 
          style={styles.communityButton}
          onPress={() => navigation.navigate('Community')}
        >
          <Text style={styles.communityButtonText}>Join Community</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Styles would be quite extensive, so I'll provide key styles
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4'
  },
  heroSection: {
    backgroundColor: '#2c3e50',
    padding: 20,
    alignItems: 'center'
  },
  heroTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold'
  },
  // More styles would be defined here...
});

export default HomeScreen;