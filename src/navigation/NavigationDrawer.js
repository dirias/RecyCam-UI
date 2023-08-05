import { createDrawerNavigator } from "@react-navigation/drawer"
import HomeScreen from '../screens/Home'

const Drawer = createDrawerNavigator()
export default function NavigationDrawer(){
    
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={ HomeScreen }/>
        </Drawer.Navigator>

    )
}