import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/auth/ProfileScreen";
import DashboardScreen from "./screens/auth/DashboardScreen";
import { Ionicons } from "@expo/vector-icons";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./contexts/AuthContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === "Dashboard") {
                        iconName = "home-outline";
                    } else if (route.name === "Profile") {
                        iconName = "person-outline";
                    }
                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    );
                },
                tabBarActiveTintColor: "blue",
                tabBarInactiveTintColor: "gray",
            })}
        >
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

const AppNavigator = () => {
    const { user } = useAuth();

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={user ? "AuthTabs" : "Login"}
        >
            {user ? (
                <>
                    {/* Auth User Screens */}
                    <Stack.Screen name="AuthTabs" component={AuthTabs} />
                </>
            ) : (
                <>
                
                    {/* Guest User Screens */}
                    <Stack.Screen name="Login" component={LoginScreen} />
                </>
            )}

        </Stack.Navigator>
    );
};

export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </AuthProvider>
    );
}
