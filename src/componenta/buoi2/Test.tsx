import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Test() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);

  const validateInput = () => {
    const nameRegex = /^[A-Za-zÀ-ỹ\s]+$/;
    const phoneRegex = /^[0-9]{8,12}$/; 

    if (!name.trim() || !phone.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ tên và số điện thoại!');
      return false;
    }
    if (!nameRegex.test(name.trim())) {
      Alert.alert('Lỗi', 'Tên không được chứa số hoặc ký tự đặc biệt!');
      return false;
    }
    if (!phoneRegex.test(phone.trim())) {
      Alert.alert('Lỗi', 'Số điện thoại chỉ được chứa số (8–12 ký tự)!');
      return false;
    }
    return true;
  };

  const handleAddOrEdit = () => {
    if (!validateInput()) return; 

    if (editingId) {
      const updatedList = contacts.map((item) =>
        item.id === editingId ? { ...item, name, phone } : item
      );
      setContacts(updatedList);
      setEditingId(null);
    } else {
      const newContact = { id: Date.now().toString(), name, phone };
      setContacts([newContact, ...contacts]);
    }

    setName('');
    setPhone('');
  };

  const handleDelete = (id) => {
    Alert.alert('Xác nhận', 'Bạn có chắc muốn xóa liên hệ này?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: () => setContacts(contacts.filter((item) => item.id !== id)),
      },
    ]);
  };

  const handleEdit = (item) => {
    setName(item.name);
    setPhone(item.phone);
    setEditingId(item.id);
  };

  const filteredContacts = contacts.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="book-outline" size={28} color="#FF66A3" />
        <Text style={styles.headerText}>Danh Bạ Cute</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên"
          placeholderTextColor="#A1A1A1"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại"
          placeholderTextColor="#A1A1A1"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddOrEdit}>
          <Text style={styles.addButtonText}>{editingId ? '💾 LƯU' : '+ THÊM'}</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="🔍 Tìm kiếm..."
        placeholderTextColor="#A1A1A1"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardLeft}>
              <Ionicons name="person-circle-outline" size={22} color="#1D4ED8" />
              <Text style={styles.cardText}>{item.name} - {item.phone}</Text>
            </View>
            <View style={styles.cardRight}>
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Ionicons name="pencil-outline" size={20} color="#FACC15" style={{ marginRight: 10 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Ionicons name="trash-outline" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', color: '#888', marginTop: 20 }}>
            Chưa có liên hệ nào
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4F2',
    padding: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FF66A3',
    marginLeft: 8,
  },
  form: {
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    width: '90%',
    padding: 10,
    marginBottom: 8,
    fontSize: 16,
    color: '#333333',
    borderWidth: 1,
    borderColor: '#FBCFE8',
  },
  addButton: {
    backgroundColor: '#FF66A3',
    borderRadius: 8,
    paddingVertical: 10,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    width: '90%',
    alignSelf: 'center',
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#FBCFE8',
  },
  card: {
    backgroundColor: '#FFECEC',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    width: '90%',
    alignSelf: 'center',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
    marginLeft: 6,
    color: '#333333',
  },
  cardRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});







