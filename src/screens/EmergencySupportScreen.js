// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const EmergencySupportScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Emergency Support Screen</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   text: { fontSize: 20, fontWeight: 'bold' },
// });

// export default EmergencySupportScreen;
// EmergencySupportScreen.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
// import CheckBox from '@react-native-community/checkbox';
import Checkbox from 'expo-checkbox';
import useEmergencyAlert from '../hooks/useEmergencyAlert';

const EmergencySupportScreen = () => {
  const { triggerEmergencyAlert, setEmergencyContacts } = useEmergencyAlert();

  const [contacts, setContacts] = useState([
    { id: 1, name: 'Mom', phone: '+1-555-123-4567', relation: 'Primary Guardian' },
    { id: 2, name: 'Dad', phone: '+1-555-987-6543', relation: 'Secondary Guardian' },
    { id: 3, name: 'Care Coordinator', phone: '+1-555-246-8135', relation: 'Medical Support' }
  ]);

  const [selectedContacts, setSelectedContacts] = useState([]);

  const toggleContactSelection = (contact) => {
    setSelectedContacts(prev =>
      prev.some(c => c.id === contact.id)
        ? prev.filter(c => c.id !== contact.id)
        : [...prev, contact]
    );
  };

  const sendAlert = () => {
    if (selectedContacts.length === 0) {
      Alert.alert('Select Contact', 'Please select at least one contact.');
      return;
    }
    // Use a particular index from the selected contacts (for example, the first one)
    const chosenContact = selectedContacts[0];

    // Update the emergency contacts in the hook to only the chosen contact
    setEmergencyContacts([chosenContact]);

    // Trigger the emergency alert with the chosen contact
    triggerEmergencyAlert({ message: 'User is in an emergency! Please help immediately.', location: true });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Icon name="alert-triangle" size={40} color="red" />
          <Text style={styles.title}>Emergency SOS</Text>
        </View>

        <Text style={styles.sectionTitle}>Select Emergency Contact</Text>
        {contacts.map(contact => (
          <TouchableOpacity
            key={contact.id}
            style={[styles.contactCard, selectedContacts.some(c => c.id === contact.id) && styles.selected]}
            onPress={() => toggleContactSelection(contact)}
          >
            <Icon name="phone-call" size={20} style={styles.icon} />
            <View>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactRelation}>{contact.relation}</Text>
            </View>
            {/* <CheckBox
              value={selectedContacts.some(c => c.id === contact.id)}
              onValueChange={() => toggleContactSelection(contact)}
            /> */}
            <Checkbox
              value={selectedContacts.some(c => c.id === contact.id)}
              onValueChange={() => toggleContactSelection(contact)}
            />
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.alertButton} onPress={sendAlert}>
          <Text style={styles.alertButtonText}>🚨 SEND EMERGENCY ALERT</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6', padding: 16 },
  card: { backgroundColor: 'white', borderRadius: 10, padding: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold', color: 'red', marginLeft: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  contactCard: { flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', marginBottom: 8 },
  selected: { backgroundColor: '#d1fae5', borderColor: '#10b981' },
  icon: { marginRight: 10 },
  contactName: { fontSize: 16, fontWeight: '500' },
  contactRelation: { fontSize: 14, color: '#6b7280' },
  alertButton: { backgroundColor: 'red', padding: 15, borderRadius: 8, alignItems: 'center' },
  alertButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});

export default EmergencySupportScreen;

