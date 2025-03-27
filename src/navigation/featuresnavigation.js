import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import VisionSupportScreen from '../screens/VisionSupport';
import BCICommunicationScreen from '../screens/BCICommunication';
import NavigationAssistanceScreen from '../screens/NavigationAssistance';
// import LearningChallengesScreen from '../screens/LearningChallenges';
import EmergencySupportScreen from '../screens/EmergencySupportScreen';
import TextToSpeech from "../screens/TextToSpeech"; // Import the TTS screen
import SpeechToText from '../screens/SpeechToText';  // Make sure it's imported
import Chatbot from '../components/Chatbot';
import ChatbotButton from '../screens/ChatbotButton';
import AssistanceScreen from '../screens/AssistanceScreen';

const Stack = createStackNavigator();

const FeaturesNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ChatbotButton" component={ChatbotButton} />
      <Stack.Screen name="Chatbot" component={Chatbot} />
      <Stack.Screen name="VisionSupportScreen" component={VisionSupportScreen} />
      <Stack.Screen name="BCICommunicationScreen" component={BCICommunicationScreen} />
      <Stack.Screen name="NavigationAssistanceScreen" component={NavigationAssistanceScreen} />
      
      <Stack.Screen name="EmergencySupportScreen" component={EmergencySupportScreen} />
      <Stack.Screen name="TextToSpeech" component={TextToSpeech} />
      <Stack.Screen name="SpeechToText" component={SpeechToText} /> 
      <Stack.Screen name='AssistanceScreen' component={AssistanceScreen}/>

    
    </Stack.Navigator>
  );
};

export default FeaturesNavigator;
