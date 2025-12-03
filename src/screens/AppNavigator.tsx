import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import Home from './Home';
import DetailsScreen from './DetailsScreen';
import AdminScreen from './AdminScreen';
import { Product } from '../components/Type';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Admin: undefined;
  Details: { product: Product };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={DetailsScreen} />

      <Stack.Screen name="Admin" component={AdminScreen} />
    </Stack.Navigator>
  );
}
