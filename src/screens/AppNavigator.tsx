// src/screens/AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import DetailsScreen from '../screens/DetailsScreen';
import { Product } from '../components/Type';

// Định nghĩa các màn hình trong Stack
export type RootStackParamList = {
  Home: undefined;
  Details: { product: Product };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{ title: 'Trang chủ' }} 
      />
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen} 
        options={{ title: 'Chi tiết sản phẩm' }} 
      />
    </Stack.Navigator>
  );
}
