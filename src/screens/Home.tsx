// src/screens/HomeScreen.tsx
import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Header from '../components/Header';
import CategorySelector from '../components/CategorySelector';
import { Product } from '../components/Type';


type Props = NativeStackScreenProps<any, any>;

// Sample data (các loại nước uống)
const SAMPLE_PRODUCTS: Product[] = [
  { id: '1', name: 'Cà phê sữa đá', category: 'Cà phê', price: 30000, image: 'https://i.imgur.com/2nCt3Sb.png', description: 'Cà phê pha phin + sữa đặc' },
  { id: '2', name: 'Cà phê đen', category: 'Cà phê', price: 25000, image: 'https://i.imgur.com/DvpvklR.png' },
  { id: '3', name: 'Trà sữa trân châu', category: 'Trà sữa', price: 45000, image: 'https://i.imgur.com/1bX5QH6.png' },
  { id: '4', name: 'Trà đào cam sả', category: 'Trà hoa quả', price: 40000, image: 'https://i.imgur.com/2nCt3Sb.png' },
  { id: '5', name: 'Sinh tố bơ', category: 'Sinh tố', price: 50000, image: 'https://i.imgur.com/DvpvklR.png' },
  { id: '6', name: 'Nước ép cam', category: 'Nước ép', price: 35000, image: 'https://i.imgur.com/1bX5QH6.png' },
];

export default function Home({ navigation }: Props) {
  // giả lập user đã đăng nhập (sau này thay bằng store)
  const [username, setUsername] = useState<string | null>('user01');

  const [products] = useState<Product[]>(SAMPLE_PRODUCTS);
  // khoi tao lay duoc cac loai
  const categories = useMemo(() => Array.from(new Set(products.map(p => p.category))), [products]);

  // filters
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [q, setQ] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  const filtered = useMemo(() => {
    const qLower = q.trim().toLowerCase();
    const nameLower = nameFilter.trim().toLowerCase();
    const min = parseFloat(minPrice) || 0;
    const max = parseFloat(maxPrice) || Number.MAX_SAFE_INTEGER;

    return products.filter(p => {
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (qLower) {
        if (!(p.name.toLowerCase().includes(qLower) || p.category.toLowerCase().includes(qLower))) return false;
      }
      if (nameLower && !p.name.toLowerCase().includes(nameLower)) return false;
      if (p.price < min || p.price > max) return false;
      return true;
    });
  }, [products, selectedCategory, q, nameFilter, minPrice, maxPrice]);

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Details', { product: item })} // <- navigator đã thêm
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price.toLocaleString()} đ</Text>
      <Text style={styles.cat}>{item.category}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <Header username={username} onLogout={() => setUsername(null)} />

      <View style={styles.container}>
        <CategorySelector categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />

        <TextInput placeholder="Tìm kiếm theo tên hoặc danh mục" style={styles.input} value={q} onChangeText={setQ} />

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TextInput placeholder="Lọc tên" style={[styles.input, { flex: 1 }]} value={nameFilter} onChangeText={setNameFilter} />
          <TextInput placeholder="Min giá" style={[styles.input, { width: 100 }]} keyboardType="numeric" value={minPrice} onChangeText={setMinPrice} />
          <TextInput placeholder="Max giá" style={[styles.input, { width: 100 }]} keyboardType="numeric" value={maxPrice} onChangeText={setMaxPrice} />
        </View>

        <Text style={{ marginVertical: 8 }}>Kết quả: {filtered.length} sản phẩm</Text>

        <FlatList
          data={filtered}
          keyExtractor={i => i.id}
          numColumns={2}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 120 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 8, marginBottom: 8 },
  card: { flex: 1, margin: 8, backgroundColor: '#fff', padding: 8, borderRadius: 8, alignItems: 'center', elevation: 3 },
  image: { width: 120, height: 100, borderRadius: 8, marginBottom: 8 },
  name: { fontWeight: 'bold', textAlign: 'center' },
  price: { color: '#E91E63', marginTop: 6 },
  cat: { marginTop: 4, fontSize: 12, color: '#666' },
});
