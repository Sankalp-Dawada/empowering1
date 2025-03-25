import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import only HomeScreen (since it's the only file available)
import HomeScreen from './src/screens/home';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={{
              headerStyle: { backgroundColor: '#2c3e50' },
              headerTintColor: '#ffffff',
              headerTitleStyle: { fontWeight: 'bold' }
            }}
          >
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ title: 'Empowering AI' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100vw',  // Full width for web view
    height: '100vh', // Full height for web view
    overflow: 'hidden', // Prevents unwanted scrolling
  },
});

export default App;
