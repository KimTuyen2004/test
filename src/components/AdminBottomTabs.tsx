import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageUsers from '../screens/ManageUsers';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';

export type AdminTabParamList = {
  Admin: undefined;
  Register: undefined;
  Login: undefined;
};

const Tab = createBottomTabNavigator<AdminTabParamList>();

export default function AdminBottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#f4f6f8', height: 60 },
        tabBarLabelStyle: { fontSize: 12, marginBottom: 4 },
      }}
    >
      <Tab.Screen
        name="Admin"
        component={ManageUsers}
        options={{ title:'Users', tabBarIcon: ({ color, size }) => <Text style={{ fontSize:size, color }}>👤</Text> }}
      />
      <Tab.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title:'Signup', tabBarIcon: ({ color, size }) => <Text style={{ fontSize:size, color }}>➕</Text> }}
      />
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{ title:'Login', tabBarIcon: ({ color, size }) => <Text style={{ fontSize:size, color }}>🔑</Text> }}
      />
    </Tab.Navigator>
  );
}
