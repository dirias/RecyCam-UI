import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './src/navigation/Navigation';
import NavigationTab from './src/navigation/NavigationTap';

export default function App() {
  return (
    <NavigationContainer>
      <NavigationTab/>
    </NavigationContainer>
  );
}
