 // src/styles/GlobalStyles.js
  import { StyleSheet } from 'react-native';
  import Colors from '../constants/Colorss';
  
  export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    accessibleText: {
      color: Colors.text,
      fontSize: 16,
      lineHeight: 24,
    },
    largeText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: Colors.text,
    },
    button: {
      backgroundColor: Colors.primary,
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginVertical: 10,
    },
    buttonText: {
      color: Colors.background,
      fontSize: 18,
      fontWeight: 'bold',
    },
  });