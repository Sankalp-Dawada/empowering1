import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const VisionSupportScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.canGoBack() ? navigation.goBack() : console.warn("No back screen")} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vision Support</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>AI-powered visual assistance to help navigate and understand your environment</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  headerContainer: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#FFF' },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  descriptionContainer: { padding: 15, backgroundColor: '#FFF', marginVertical: 10 },
  descriptionText: { fontSize: 16, color: '#666', textAlign: 'center' }
});

export default VisionSupportScreen;
