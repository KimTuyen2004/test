// ManageUsers.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { fetchUsers, deleteUser, changeUserRole, User } from '../database/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PAGE_SIZE = 3;

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Load user đang login từ AsyncStorage
  const loadCurrentUser = async () => {
    const json = await AsyncStorage.getItem('user');
    if (json) setCurrentUser(JSON.parse(json));
  };

  // Load danh sách user theo page, đảm bảo role luôn có giá trị
  const loadUsers = async (page = 1) => {
    setLoading(true);
    const allUsers = await fetchUsers();

    const mappedUsers = allUsers.map(u => ({
      ...u,
      role: u.role === 'admin' ? 'admin' : 'user', // chắc chắn là string
    }));

    setTotalPages(Math.ceil(mappedUsers.length / PAGE_SIZE));
    setUsers(mappedUsers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE));
    setCurrentPage(page);
    setLoading(false);
  };

  useEffect(() => {
    loadCurrentUser();
    loadUsers();
  }, []);

  // Xóa user
  const handleDelete = (id: number) => {
    Alert.alert('Xác nhận', 'Bạn có chắc muốn xóa user này?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: async () => {
          await deleteUser(id);
          loadUsers(currentPage);
        },
      },
    ]);
  };

  // Thay đổi role
  const handleRoleChange = async (id: number, role: 'admin' | 'user') => {
    await changeUserRole(id, role);
    loadUsers(currentPage);
  };

  // Render từng user
  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.card}>
      <Text>ID: {item.id}</Text>
      <Text>Username: {item.username}</Text>

      {/* Dòng hiển thị role hiện tại */}
      <Text>Role hiện tại: {item.role}</Text>

      {/* Dòng Picker để đổi role */}
      <View style={styles.row}>
        <Text>Change Role:</Text>
        <Picker
          selectedValue={item.role}
          style={{ width: 120, height: 35 }}
          onValueChange={(val) => handleRoleChange(item.id, val as 'admin' | 'user')}
        >
          <Picker.Item label="Admin" value="admin" />
          <Picker.Item label="User" value="user" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
        <Text style={{ color: '#fff' }}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" color="#007aff" style={{ marginTop: 20 }} />
      ) : (
        <>
          <FlatList
            data={users}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 12, paddingBottom: 20 }}
          />

          <View style={styles.pagination}>
            <TouchableOpacity
              disabled={currentPage === 1}
              style={[styles.pageButton, currentPage === 1 && { backgroundColor: '#ccc' }]}
              onPress={() => loadUsers(currentPage - 1)}
            >
              <Text style={{ color: '#fff' }}>Previous</Text>
            </TouchableOpacity>

            <Text style={{ marginHorizontal: 12 }}>
              Page {currentPage}/{totalPages}
            </Text>

            <TouchableOpacity
              disabled={currentPage === totalPages}
              style={[styles.pageButton, currentPage === totalPages && { backgroundColor: '#ccc' }]}
              onPress={() => loadUsers(currentPage + 1)}
            >
              <Text style={{ color: '#fff' }}>Next</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
  deleteButton: { backgroundColor: '#ff4d4d', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6, marginTop: 6, alignItems: 'center' },
  pageButton: { paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#007aff', borderRadius: 6 },
  pagination: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
});
