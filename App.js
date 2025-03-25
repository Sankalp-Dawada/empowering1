// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import Screens
import HomeScreen from './src/screens/HomeScreen';
import { 
  FeaturesScreen, 
  AIAssistanceScreen, 
  LoginScreen, 
  SupportScreen, 
  PrivacyPolicyScreen 
} from './src/screens/PlaceholderScreens';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerShown: false, // Hide default navigation header
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Features" component={FeaturesScreen} />
          <Stack.Screen name="AIAssistance" component={AIAssistanceScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;