import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/Home'

const Stack = createNativeStackNavigator();
export default function PokedexNavigation() {
  return (
    <Stack.Navigator>
        <Stack.Screen name='HomeScreen' component={HomeScreen} options={{title: '', headerTransparent: false}}/>
    </Stack.Navigator>
  )
}