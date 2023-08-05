import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Image } from 'react-native';
import HomeScreen from "../screens/Home";
import PhotoScreen from '../screens/Photo';
import CameraScreen from "../screens/Camera";

const Tab = createBottomTabNavigator();

export default function NavigationTab(){
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} 
            options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                    source={focused ? require('../assets/home_icon.png') : require('../assets/home_icon.png')}
                    style={{ width: 24, height: 24, tintColor: focused ? '#007AFF' : '#8E8E93' }}
                    />
                ),
                }}/>
            <Tab.Screen name="Camera" component={CameraScreen} 
            options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                    source={focused ? require('../assets/camera_icon.png') : require('../assets/camera_icon.png')}
                    style={{ width: 24, height: 24, tintColor: focused ? '#007AFF' : '#8E8E93' }}
                    />
                ),
                }}
            />
            <Tab.Screen name="Photo" component={PhotoScreen} 
            options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                    source={focused ? require('../assets/photo_icon.png') : require('../assets/photo_icon.png')}
                    style={{ width: 24, height: 24, tintColor: focused ? '#007AFF' : '#8E8E93' }}
                    />
                ),
                }}
            />
        </Tab.Navigator>
    )
}