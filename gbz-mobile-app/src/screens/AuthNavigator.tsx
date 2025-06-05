import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
          let iconName: any =
            route.name === 'Connexion' ? 'login' : 'account-plus-outline';
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Connexion">
        {() => <LoginScreen onLoginSuccess={onLoginSuccess} />}
      </Tab.Screen>
      <Tab.Screen name="Inscription" component={SignupScreen} />
    </Tab.Navigator>
  );
}
