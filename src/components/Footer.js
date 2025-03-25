// src/components/Footer.js
import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Linking 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GlobalStyles from '../styles/GlobalStyles';
import Colors from '../constants/Colorss';

const Footer = ({ navigation }) => {
  const openSocialMedia = (platform) => {
    let url = '';
    switch(platform) {
      case 'twitter':
        url = 'https://twitter.com/empoweringapp';
        break;
      case 'linkedin':
        url = 'https://linkedin.com/company/empoweringapp';
        break;
      case 'facebook':
        url = 'https://facebook.com/empoweringapp';
        break;
    }
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.quickLinksContainer}>
        <Text 
          style={styles.sectionTitle}
          accessibilityRole="header"
        >
          Quick Links
        </Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Home')}
          accessibilityRole="button"
          accessibilityLabel="Home Page"
        >
          <Text style={styles.linkText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Features')}
          accessibilityRole="button"
          accessibilityLabel="App Features"
        >
          <Text style={styles.linkText}>Features</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Support')}
          accessibilityRole="button"
          accessibilityLabel="Support Page"
        >
          <Text style={styles.linkText}>Support</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Privacy')}
          accessibilityRole="button"
          accessibilityLabel="Privacy Policy"
        >
          <Text style={styles.linkText}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contactContainer}>
        <Text 
          style={styles.sectionTitle}
          accessibilityRole="header"
        >
          Contact Us
        </Text>
        <Text 
          style={styles.contactText}
          accessibilityLabel="Support Email"
        >
          support@empoweringapp.com
        </Text>
        <Text 
          style={styles.contactText}
          accessibilityLabel="Support Phone Number"
        >
          +1 (800) EMPOWER
        </Text>
      </View>

      <View style={styles.socialContainer}>
        <Text 
          style={styles.sectionTitle}
          accessibilityRole="header"
        >
          Connect With Us
        </Text>
        <View style={styles.socialIcons}>
          <TouchableOpacity 
            onPress={() => openSocialMedia('twitter')}
            accessibilityRole="button"
            accessibilityLabel="Empowering App Twitter"
          >
            <Icon name="twitter" size={30} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => openSocialMedia('linkedin')}
            accessibilityRole="button"
            accessibilityLabel="Empowering App LinkedIn"
          >
            <Icon name="linkedin" size={30} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => openSocialMedia('facebook')}
            accessibilityRole="button"
            accessibilityLabel="Empowering App Facebook"
          >
            <Icon name="facebook" size={30} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: Colors.accessibleGray,
  },
  sectionTitle: {
    ...GlobalStyles.accessibleText,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quickLinksContainer: {
    flex: 1,
    marginRight: 10,
  },
  linkText: {
    ...GlobalStyles.accessibleText,
    marginBottom: 5,
  },
  contactContainer: {
    flex: 1,
    marginRight: 10,
  },
  contactText: {
    ...GlobalStyles.accessibleText,
    marginBottom: 5,
  },
  socialContainer: {
    flex: 1,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Footer;