// src/components/CommunitySection.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput, 
  Modal 
} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import Colors from '../constants/Colorss';

const CommunitySection = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');

  const handleJoinCommunity = () => {
    // Validate email and submit
    if (email) {
      // TODO: Implement email submission logic
      console.log('Submitted email:', email);
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text 
        style={styles.sectionTitle}
        accessibilityRole="header"
      >
        Join the Empowering Community
      </Text>
      
      <Text style={styles.description}>
        Connect with users, developers, and accessibility advocates. 
        Get support, share experiences, and stay updated.
      </Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={GlobalStyles.button}
          onPress={() => setModalVisible(true)}
          accessibilityRole="button"
          accessibilityLabel="Join Community Mailing List"
        >
          <Text style={GlobalStyles.buttonText}>Join Community</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[GlobalStyles.button, styles.secondaryButton]}
          onPress={() => {/* Navigate to forum or support page */}}
          accessibilityRole="button"
          accessibilityLabel="Get Personalized Support"
        >
          <Text style={GlobalStyles.buttonText}>Get Support</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Join Our Community</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              accessibilityLabel="Email input for community newsletter"
            />
            <TouchableOpacity 
              style={GlobalStyles.button}
              onPress={handleJoinCommunity}
            >
              <Text style={GlobalStyles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setModalVisible(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.background,
    alignItems: 'center',
  },
  sectionTitle: {
    ...GlobalStyles.largeText,
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    ...GlobalStyles.accessibleText,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  secondaryButton: {
    backgroundColor: Colors.secondary,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: Colors.background,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    ...GlobalStyles.largeText,
    marginBottom: 15,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelButtonText: {
    color: Colors.primary,
  },
});

export default CommunitySection;