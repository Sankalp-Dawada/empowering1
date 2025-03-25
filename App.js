import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FeaturesNavigator from './src/navigation/featuresnavigation'; // ✅ Correct (matches your filename)


const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <FeaturesNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
