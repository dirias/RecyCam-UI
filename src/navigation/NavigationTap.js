import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeScreen from "../screens/Home";
import PhotoScreen from '../screens/Photo';
import CapturePhoto from "../components/CapturePhoto";

const Tab = createBottomTabNavigator();

export default function NavigationTab(){
    return (
        <Tab.Navigator>
            <Tab.Screen name="Camera" component={CapturePhoto} />
            <Tab.Screen name="Photo" component={PhotoScreen} />
        </Tab.Navigator>
    )
}