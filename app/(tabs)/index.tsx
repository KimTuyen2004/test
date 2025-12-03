// app/(tabs)/index.tsx
import React from 'react';
import AppNavigator from '@/src/screens/AppNavigator';

// import { initDatabase } from '@/src/database/database';
// import { ActivityIndicator, View } from 'react-native';
import ManageUsers from '@/src/screens/ManageUsers';


export default function HomeScreen() {
  return <AppNavigator />;
  return <ManageUsers />
}


