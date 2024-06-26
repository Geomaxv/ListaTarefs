import { NavigationContainer} from "@react-navigation/native";
import {createStackNavigator } from "@react-navigation/stack";

import Home from "./Telas/home";
import Detail from "./Telas/detail";

const Stack = createStackNavigator();

export default function App(){
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen 
                name='Home'
                component={Home}
                />
                <Stack.Screen 
                name="Detail"
                component={Detail}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}