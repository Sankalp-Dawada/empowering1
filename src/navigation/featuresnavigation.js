import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import VisionSupportScreen from '../screens/VisionSupport';
import BCICommunicationScreen from '../screens/BCICommunication';
import NavigationAssistanceScreen from '../screens/NavigationAssistance';
import LearningChallengesScreen from '../screens/LearningChallenges';
import EmergencySupportScreen from '../screens/EmergencySupportScreen';



const Stack = createStackNavigator();

const FeaturesNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="VisionSupportScreen" component={VisionSupportScreen} />
      <Stack.Screen name="BCICommunicationScreen" component={BCICommunicationScreen} />
      <Stack.Screen name="NavigationAssistanceScreen" component={NavigationAssistanceScreen} />
      <Stack.Screen name="LearningChallengesScreen" component={LearningChallengesScreen} />
      <Stack.Screen name="EmergencySupportScreen" component={EmergencySupportScreen} />
   
    
    </Stack.Navigator>
  );
};

export default FeaturesNavigator;
