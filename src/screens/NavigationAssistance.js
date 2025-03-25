// src/screens/NavigationAssistanceScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomNavbar from '../components/BottomNavbar';
import { useNavigationService } from '../hooks/useNavigationService'; 

const NavigationAssistanceScreen = ({ navigation }) => {
  const [activeMode, setActiveMode] = useState(null);
  const { startSmartNavigation } = useNavigationService();

  const navigationModes = [
    {
      title: "Smart Wheelchair Navigation",
      icon: "navigate-outline",
      description: "AI-powered real-time wheelchair guidance",
      onPress: () => {
        setActiveMode("Smart Wheelchair Navigation");
        startSmartNavigation();
      }
    },
    {
      title: "Obstacle Detection",
      icon: "alert-circle-outline",
      description: "Detects obstacles and suggests alternative paths",
      onPress: () => {
        setActiveMode("Obstacle Detection");
      }
    },
    {
      title: "Voice-Control Navigation",
      icon: "mic-outline",
      description: "Navigate using voice commands",
      onPress: () => {
        setActiveMode("Voice-Control Navigation");
      }
    },
    {
      title: "Companion Assistance",
      icon: "people-outline",
      description: "Connect with caregivers for guided navigation",
      onPress: () => {
        setActiveMode("Companion Assistance");
      }
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            Navigation Assistance
          </Text>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            AI-powered mobility solutions for enhanced independence
          </Text>
        </View>

        <View style={styles.modesContainer}>
          {navigationModes.map((mode, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.modeCard,
                activeMode === mode.title && styles.activeModeCard
              ]}
              onPress={mode.onPress}
              accessibilityRole="button"
              accessibilityLabel={mode.title}
            >
              <Icon 
                name={mode.icon} 
                size={40} 
                color="#4A90E2" 
                style={styles.modeIcon}
              />
              <View style={styles.modeTextContainer}>
                <Text style={styles.modeTitle}>{mode.title}</Text>
                <Text style={styles.modeDescription}>
                  {mode.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      
      <BottomNavbar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF'
  },
  backButton: {
    marginRight: 15
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333'
  },
  descriptionContainer: {
    padding: 15,
    backgroundColor: '#FFFFFF',
    marginVertical: 10
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center'
  },
  modesContainer: {
    padding: 15
  },
  modeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  activeModeCard: {
    borderColor: '#4A90E2',
    borderWidth: 2
  },
  modeIcon: {
    marginRight: 15
  },
  modeTextContainer: {
    flex: 1
  },
  modeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  modeDescription: {
    fontSize: 14,
    color: '#666'
  }
});

export default NavigationAssistanceScreen;
