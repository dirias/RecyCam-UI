import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeScreen from "../screens/Home";
import PhotoScreen from '../screens/Photo';
import CameraScreen from "../screens/Camera";

const Tab = createBottomTabNavigator();

export default function NavigationTab(){
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Camera" component={CameraScreen} />
            <Tab.Screen name="Photo" component={PhotoScreen} />
        </Tab.Navigator>
    )
}