// src/components/Header.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  username?: string | null;
  onLogout?: () => void;
};

export default function Header({ username, onLogout }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>DrinkShop</Text>
      <View style={styles.right}>
        {username ? (
          <>
            <Text style={styles.user}>Hi, {username}</Text>
            <TouchableOpacity onPress={onLogout}>
              <Text style={styles.link}>Đăng xuất</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.user}>Chưa đăng nhập</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: 56, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#E91E63' },
  title: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  right: { flexDirection: 'row', alignItems: 'center' },
  user: { color: '#fff', marginRight: 8 },
  link: { color: '#fff', textDecorationLine: 'underline' },
});
