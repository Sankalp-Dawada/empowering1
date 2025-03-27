import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Button, 
  Text, 
  ScrollView, 
  Alert 
} from 'react-native';

const API_KEY = 'AIzaSyAbmXE7K5TaNTv0zT74WUXQoP8BJOFEezo'; // Replace with your actual API key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

function Chatbot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ text: input }],
            role: 'user'
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 256
          }
        }),
      });

      // Log the raw response for debugging
      const responseText = await response.text();
      console.log('Raw Response:', responseText);

      // Parse the response manually
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        throw new Error('Failed to parse API response');
      }

      // More detailed error checking
      if (response.ok) {
        if (data?.candidates && data.candidates.length > 0) {
          const botResponse = data.candidates[0]?.content?.parts?.[0]?.text || 'No response from AI';
          setMessages(prevMessages => [
            ...prevMessages, 
            { role: 'bot', content: botResponse }
          ]);
        } else {
          // Log the full data for investigation
          console.log('Unexpected API response structure:', data);
          setMessages(prevMessages => [
            ...prevMessages, 
            { role: 'bot', content: 'Unexpected response from AI' }
          ]);
        }
      } else {
        // Handle API errors
        console.error('API Error:', data);
        const errorMessage = data.error?.message || 'Unknown API error';
        setMessages(prevMessages => [
          ...prevMessages, 
          { role: 'bot', content: `Error: ${errorMessage}` }
        ]);
        
        // Show an alert for critical errors
        Alert.alert(
          'API Error', 
          errorMessage, 
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      setMessages(prevMessages => [
        ...prevMessages, 
        { role: 'bot', content: `Network Error: ${error.message}` }
      ]);

      // Show an alert for network errors
      Alert.alert(
        'Network Error', 
        'Unable to connect to the AI service. Please check your internet connection.', 
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <ScrollView 
        style={{ flex: 1 }} 
        keyboardShouldPersistTaps="handled"
      >
        {messages.map((msg, index) => (
          <Text 
            key={index} 
            style={{ 
              marginVertical: 5, 
              color: msg.role === 'user' ? 'blue' : 'green',
              padding: 10,
              backgroundColor: msg.role === 'user' ? '#e6f2ff' : '#e6ffe6',
              borderRadius: 10
            }}
          >
            {msg.role === 'user' ? 'You: ' : 'AI: '}
            {msg.content}
          </Text>
        ))}
        
        {isLoading && (
          <Text style={{ color: 'gray', textAlign: 'center', marginVertical: 10 }}>
            AI is thinking...
          </Text>
        )}
      </ScrollView>
      
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          style={{ 
            flex: 1, 
            borderWidth: 1, 
            borderColor: '#ddd',
            padding: 10, 
            marginBottom: 10,
            marginRight: 10,
            borderRadius: 20
          }}
          multiline={true}
          numberOfLines={4}
        />
        <Button 
          title="Send" 
          onPress={sendMessage} 
          disabled={!input.trim() || isLoading}
        />
      </View>
    </View>
  );
}

export default Chatbot;