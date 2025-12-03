// ManageCategories.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Modal, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { fetchCategories, addCategory, updateCategory, deleteCategory, Category } from '../database/database';

export default function ManageCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [name, setName] = useState('');

  // Load danh sách category
  const loadCategories = async () => {
    setLoading(true);
    const cats = await fetchCategories();
    setCategories(cats);
    setLoading(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Mở modal thêm mới
  const openAdd = () => {
    setEditing(null);
    setName('');
    setModalVisible(true);
  };

  // Mở modal chỉnh sửa
  const openEdit = (c: Category) => {
    setEditing(c);
    setName(c.name);
    setModalVisible(true);
  };

  // Lưu (add hoặc update)
  const save = async () => {
    if (!name.trim()) {
      Alert.alert('Lỗi', 'Vui lòng điền tên loại sản phẩm');
      return;
    }

    if (editing) {
      // Sử dụng đúng hàm updateCategory
      const success = await updateCategory(editing.id, name.trim());
      if (!success) Alert.alert('Lỗi', 'Cập nhật thất bại');
    } else {
      const success = await addCategory(name.trim());
      if (!success) Alert.alert('Lỗi', 'Thêm mới thất bại');
    }

    setModalVisible(false);
    loadCategories();
  };

  // Xóa
  const handleDelete = (id: number) => {
    Alert.alert('Xác nhận', 'Bạn có chắc muốn xóa?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: async () => {
          const success = await deleteCategory(id);
          if (!success) Alert.alert('Lỗi', 'Xóa thất bại');
          loadCategories();
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <TouchableOpacity
        onPress={openAdd}
        style={{ marginBottom: 12, backgroundColor: '#007aff', padding: 10, borderRadius: 6 }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Thêm Loại Sản phẩm</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#007aff" />
      ) : (
        categories.map(c => (
          <View
            key={c.id}
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}
          >
            <Text>{c.name}</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => openEdit(c)} style={{ marginRight: 12 }}>
                <Text style={{ color: '#007aff' }}>Sửa</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(c.id)}>
                <Text style={{ color: '#ff4d4d' }}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}

      <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <View style={{ flex: 1, padding: 12 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>
            {editing ? 'Sửa Loại Sản phẩm' : 'Thêm Loại Sản phẩm'}
          </Text>
          <TextInput
            placeholder="Tên Loại"
            value={name}
            onChangeText={setName}
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 6,
              padding: 8,
              marginBottom: 12,
            }}
          />
          <Button title="Hủy" onPress={() => setModalVisible(false)} />
          <View style={{ height: 12 }} />
          <Button title="Lưu" onPress={save} />
        </View>
      </Modal>
    </View>
  );
}
