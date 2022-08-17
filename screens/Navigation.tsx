import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import {SafeAreaProvider} from "react-native-safe-area-context";
import CategoryScreen from "./CategoryScreen";
import PostScreen from "./PostScreen";

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                    />
                    <Stack.Screen
                        name="Category"
                        component={CategoryScreen}
                    />
                    <Stack.Screen
                        name="Post"
                        component={PostScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
