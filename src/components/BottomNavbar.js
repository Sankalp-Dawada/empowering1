// src/components/BottomNavbar.js
import React from 'react';
import { 
  View, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BottomNavbar = ({ navigation }) => {
  const navItems = [
    { 
      name: 'Home', 
      icon: 'home-outline', 
      route: 'HomeScreen' 
    },
    { 
      name: 'Assistance', 
      icon: 'accessibility-outline', 
      route: 'AssistanceScreen' 
    },
    { 
      name: 'Emergency', 
      icon: 'alert-circle-outline', 
      route: 'EmergencySupportScreen' 
    },
    { 
      name: 'Profile', 
      icon: 'person-outline', 
      route: 'UserProfileScreen' 
    }
  ];

  return (
    <View style={styles.navbar}>
      {navItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.navItem}
          onPress={() => navigation.navigate(item.route)}
          accessibilityRole="button"
          accessibilityLabel={item.name}
        >
          <Icon 
            name={item.icon} 
            size={24} 
            color="#333" 
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 10
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default BottomNavbar;