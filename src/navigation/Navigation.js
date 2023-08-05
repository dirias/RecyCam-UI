import { View, Text, TabBarIOSItem } from 'react-native'
// import { createBottonTabNavigator } from "@react-navigation/bottom-tabs"
// Above just works with nav version5
import { Image, TouchableOpacity } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
//import Icon from 'react-native-vector-icons/FontAwesome5'
import HomeNavigation from './HomeNavigation';

//const Tab = createBottonTabNavigator();
//Above just works with nav version5
const Tab = createMaterialBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeNavigation} options={
          {
            tabBarLabel:'',
            tabBarIcon: () => renderIcon()
          }
        }/>
    </Tab.Navigator>
  )
}

function renderIcon() {
  return <Image
        source={require("../assets/home.png")}
        style={{width:75, height: 75, top: -15}}
        />
}