// src/screens/BCICommunicationScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomNavbar from '../components/BottomNavbar';
import { useBCICommunication } from '../hooks/useBCICommunication';

const BCICommunicationScreen = ({ navigation }) => {
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const { 
    connectDevice, 
    disconnectDevice, 
    translateThoughts, 
    calibrateDevice 
  } = useBCICommunication();

  useEffect(() => {
    // Check initial device connection status
    checkDeviceStatus();
  }, []);

  const checkDeviceStatus = async () => {
    try {
      const status = await checkBCIDeviceConnection();
      setConnectionStatus(status ? 'Connected' : 'Disconnected');
    } catch (error) {
      Alert.alert('Device Error', 'Unable to check device status');
    }
  };

  const communicationModes = [
    {
      title: "Thought Translation",
      icon: "brain-outline",
      description: "Convert mental signals to text or speech",
      onPress: () => {
        translateThoughts();
      }
    },
    {
      title: "Device Calibration",
      icon: "settings-outline",
      description: "Fine-tune BCI device for personal use",
      onPress: () => {
        calibrateDevice();
      }
    },
    {
      title: "Connect Device",
      icon: "bluetooth-outline",
      description: "Pair and connect BCI communication device",
      onPress: () => {
        connectDevice();
        setConnectionStatus('Connected');
      }
    },
    {
      title: "Disconnect Device",
      icon: "power-outline",
      description: "Safely disconnect BCI communication device",
      onPress: () => {
        disconnectDevice();
        setConnectionStatus('Disconnected');
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
            BCI Communication
          </Text>
        </View>

        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            Device Status: {connectionStatus}
          </Text>
        </View>

        <View style={styles.modesContainer}>
          {communicationModes.map((mode, index) => (
            <TouchableOpacity
              key={index}
              style={styles.modeCard}
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
  statusContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    alignItems: 'center'
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2'
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

export default BCICommunicationScreen;