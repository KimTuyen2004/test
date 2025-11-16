// src/screens/AppNavigator.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import DetailsScreen from '../screens/DetailsScreen';
import Home from '../screens/Home';
// import LoginScreen from './LoginScreen';
// import SignupScreen from './SignupScreen';

type RootStackParamList = {
  MainTabs: undefined;
  Details: { product: Product };
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image?: string;
  description?: string;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} />
      {/* <Tab.Screen name="Signup" component={SignupScreen} />
      <Tab.Screen name="Login" component={LoginScreen} /> */}
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Chi tiết' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
