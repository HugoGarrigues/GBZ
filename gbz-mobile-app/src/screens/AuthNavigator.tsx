import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from './RegisterScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../theme';

const Tab = createBottomTabNavigator();

interface Props {
  onLoginSuccess: () => void;
}

export default function AuthNavigator({ onLoginSuccess }: Props) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ color, size }) => {
          const iconName =
            route.name === 'Connexion' ? 'login' : 'account-plus-outline';
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onBackground,
        tabBarStyle: { backgroundColor: theme.colors.surface },
      })}
    >
      <Tab.Screen name="Connexion">
        {() => <LoginScreen onLoginSuccess={onLoginSuccess} />}
      </Tab.Screen>
      <Tab.Screen name="Inscription" component={RegisterScreen} />
    </Tab.Navigator>
  );
}
