import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import {SafeAreaProvider} from "react-native-safe-area-context";
import CategoryScreen from "./CategoryScreen";
import PostScreen from "./PostScreen";
import ProfileScreen from "./ProfileScreen";
import FavoritesScreen from "./FavoritesScreen";
import NotificationsScreen from "./NotificationsScreen";
import AuthorizationScreen from "./AuthorizationScreen";
import RegistrationScreen from "./RegistrationScreen";

const Stack = createNativeStackNavigator();

export default function Navigation() {
    const screens = [
        { name: 'Home', component: HomeScreen },
        { name: 'Category', component: CategoryScreen },
        { name: 'Post', component: PostScreen },
        { name: 'Profile', component: ProfileScreen },
        { name: 'Favorites', component: FavoritesScreen },
        { name: 'Notifications', component: NotificationsScreen },
        { name: 'Authorization', component: AuthorizationScreen },
        { name: 'Registration', component: RegistrationScreen },
    ];

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    {
                        screens.map(screen => (
                            <Stack.Screen
                                key={screen.name}
                                name={screen.name}
                                component={screen.component}
                            />
                        ))
                    }
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
