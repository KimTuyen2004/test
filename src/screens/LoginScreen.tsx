import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './AppNavigator';
import { getUserByCredentials } from '../database/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }

    const user = await getUserByCredentials(username.trim(), password);
    if (user) {
      // Lưu user vào AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(user));

      // Phân quyền
      if (user.role === 'admin') {
        navigation.replace('Admin');
      } else {
        navigation.replace('Home');
      }

      setUsername('');
      setPassword('');
    } else {
      Alert.alert('Lỗi', 'Tên đăng nhập hoặc mật khẩu không đúng');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <TextInput
        placeholder="Tên đăng nhập"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Mật khẩu"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 16 }} onPress={() => navigation.replace('Register')}>
        <Text style={{ color: '#007BFF', textAlign: 'center' }}>Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 12 },
  // button: { backgroundColor: '#007BFF', padding: 14, borderRadius: 8, alignItems: 'center' },
    button: { backgroundColor: '#007BFF', padding: 14, borderRadius: 8, alignItems: 'center' },

  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
