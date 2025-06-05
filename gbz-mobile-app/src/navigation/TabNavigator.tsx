import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MusclesScreen from '../screens/MusclesScreen';
import { Ionicons } from '@expo/vector-icons'; // Pour les icônes, installe avec expo install @expo/vector-icons

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, 
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'ios-home';

          if (route.name === 'Accueil') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Muscles') {
            iconName = focused ? 'ios-body' : 'ios-body-outline';
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="Muscles" component={MusclesScreen} />
    </Tab.Navigator>
  );
}
