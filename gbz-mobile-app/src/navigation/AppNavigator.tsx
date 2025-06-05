import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import ProgramsScreen from '../screens/ProgramsScreen';
import SessionsScreen from '../screens/SessionsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ExercicesScreen from '../screens/ExercisesScreen';
import LoginScreen from '../screens/LoginScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../theme';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // Vérifie le token au démarrage
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      setIsLoggedIn(!!token);
    };
    checkLoginStatus();
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  if (isLoggedIn === null) {
    // Optionnel: écran de chargement pendant la vérification
    return null;
  }

  if (!isLoggedIn) {
    return (
      <NavigationContainer theme={NavigationDarkTheme}>
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer theme={NavigationDarkTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => {
          let iconName: IconName;

          switch (route.name) {
            case 'Programs':
              iconName = 'clipboard-list-outline';
              break;
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Sessions':
              iconName = 'dumbbell';
              break;
            case 'Profile':
              iconName = 'account-circle-outline';
              break;
            case 'Exercice':
              iconName = 'weight-lifter';
              break;
            default:
              iconName = 'circle-outline';
          }

          return {
            headerShown: false,
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.onBackground,
            tabBarStyle: { backgroundColor: theme.colors.surface },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name={iconName}
                size={route.name === 'Home' ? size + 8 : size}
                color={color}
              />
            ),
          };
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Programs" component={ProgramsScreen} />
        <Tab.Screen name="Sessions" component={SessionsScreen} />
        <Tab.Screen name="Exercice" component={ExercicesScreen} />
        <Tab.Screen name="Profile">
          {() => <ProfileScreen onLogout={handleLogout} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
