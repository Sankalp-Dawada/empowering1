// src/screens/HomeScreen.js
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderNavigation from '../components/HeaderNavigation';
import HeroSection from '../components/HeroSection';
import FeaturesOverview from '../components/FeaturesOverview';
import CommunitySection from '../components/CommunitySection';
import Footer from '../components/Footer';
import GlobalStyles from '../styles/GlobalStyles';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={[GlobalStyles.container, { flex: 1 }]}>
      <HeaderNavigation navigation={navigation} />
      <ScrollView 
        contentContainerStyle={styles.scrollView} 
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <HeroSection navigation={navigation} />
        <FeaturesOverview navigation={navigation} />
        <CommunitySection />
        <Footer navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1, // ✅ Allows ScrollView to expand and scroll smoothly
    paddingBottom: 20, // ✅ Adds extra space for better scrolling
  },
});

export default HomeScreen;
