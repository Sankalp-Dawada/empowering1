import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderNavigation from '../components/HeaderNavigation';
import HeroSection from '../components/HeroSection';
import FeaturesOverview from '../components/FeaturesOverview';
import CommunitySection from '../components/CommunitySection';
import Footer from '../components/Footer';
import EmergencySosButton from '../components/EmergencySosButton';
import BottomNavbar from '../components/BottomNavbar';

const FeatureCard = ({ title, description, iconName, onPress }) => (
  <TouchableOpacity style={styles.featureCard} onPress={onPress} accessibilityRole="button">
    <Icon name={iconName} size={50} color="#4A90E2" style={styles.featureIcon} />
    <Text style={styles.featureTitle}>{title}</Text>
    <Text style={styles.featureDescription}>{description}</Text>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const features = [
    { title: "AI Assistive Platform", screen: "VisionSupportScreen", iconName: "brain" },
    { title: "BCI Communication", screen: "BCICommunicationScreen", iconName: "headset" },
    { title: "Smart Wheelchair Navigation", screen: "NavigationAssistanceScreen", iconName: "wheelchair" },
    { title: "Gamified Learning", screen: "LearningChallengesScreen", iconName: "gamepad-variant" }
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderNavigation navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
        <HeroSection navigation={navigation} />
        <FeaturesOverview navigation={navigation} />
        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              {...feature}
              onPress={() => {
                console.log("Navigating to:", feature.screen);
                navigation.navigate(feature.screen);
              }}
            />
          ))}
        </View>
        <CommunitySection />
        <Footer navigation={navigation} />
      </ScrollView>
      <View style={styles.sosContainer}><EmergencySosButton /></View>
      <View style={styles.bottomNavbarContainer}><BottomNavbar navigation={navigation} /></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: { flexGrow: 1, paddingBottom: 120 },
  featuresContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 20 },
  featureCard: { width: '48%', backgroundColor: '#FFF', borderRadius: 12, padding: 15, marginBottom: 20, elevation: 5 },
  featureIcon: { alignSelf: 'center', marginBottom: 10 },
  featureTitle: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 5 },
  featureDescription: { fontSize: 12, color: '#666', textAlign: 'center' },
  sosContainer: { position: 'absolute', bottom: 85, right: 20, zIndex: 20 },
  bottomNavbarContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', paddingVertical: 10, zIndex: 10, elevation: 15 }
});

export default HomeScreen;
