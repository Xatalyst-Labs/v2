import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import WorkoutScreen from './screens/WorkoutScreen';
import CustomDrawer from './components/nav/CustomDrawer';
import WorkoutSummary from './screens/WorkoutSummary';
import Settings from './screens/Settings';
import Achievements from './screens/Achievements';
import { useFonts } from 'expo-font';
import CountdownScreen from './screens/CountdownScreen';
import SignIn from './screens/SignIn';
import Leaderboard from './screens/LeaderboardScreen';

import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Lexend-Black': require('./assets/fonts/Lexend-Regular.ttf'),
    'Lexend-Bold': require('./assets/fonts/Lexend-Bold.ttf'),
    'Lexend-ExtraBold': require('./assets/fonts/Lexend-ExtraBold.ttf'),
    'Lexend-ExtraLight': require('./assets/fonts/Lexend-ExtraLight.ttf'),
    'Lexend-Light': require('./assets/fonts/Lexend-Light.ttf'),
    'Lexend-Medium': require('./assets/fonts/Lexend-Medium.ttf'),
    'Lexend-Regular': require('./assets/fonts/Lexend-Regular.ttf'),
    'Lexend-SemiBold': require('./assets/fonts/Lexend-SemiBold.ttf'),
    'Lexend-Thin': require('./assets/fonts/Lexend-Thin.ttf'),
  });
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => (
            <SafeAreaView style={{ flex: 1 }}>
              <CustomDrawer {...props} />
            </SafeAreaView>
          )}
          screenOptions={{ headerShown: false, drawerActiveTintColor: 'gray' }}
          initialRouteName="Workout"
        >
          <Drawer.Screen name="Workout" component={WorkoutScreen} />
          <Drawer.Screen name="Onboarding" component={OnboardingScreen} />
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="CountdownScreen" component={CountdownScreen} />
          <Drawer.Screen name="Workout Summary" component={WorkoutSummary} />
          <Drawer.Screen name="SignIn" component={SignIn} />
          <Drawer.Screen name="Settings" component={Settings} />
          <Drawer.Screen name="Leaderboard" component={Leaderboard} />
          <Drawer.Screen name="Achievements" component={Achievements} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

/*
      <Stack.Navigator initialRouteName="Workout">
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Workout"
          component={WorkoutScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>

         <Drawer.Navigator>
        <Drawer.Screen name="Workout" component={WorkoutScreen} />
      </Drawer.Navigator>
      */
