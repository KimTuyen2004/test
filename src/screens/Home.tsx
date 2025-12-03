import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CategorySelector from '../components/CategorySelector';
import Header from '../components/Header';
import { Product } from '../components/Type';
import { fetchCategories, fetchProducts, initDatabase, User } from '../database/database';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import CardScreen from './CardScreen';

type Props = NativeStackScreenProps<any, any>;
const Tab = createBottomTabNavigator();

// ---------------- Home content (giữ nguyên logic cũ) ----------------
function HomeContent({ navigation }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [q, setQ] = useState('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  // --- Lấy dữ liệu user ---
  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) setUser(JSON.parse(storedUser));
      else navigation.replace('Login');
    };
    fetchUser();
  }, []);

  // --- Lấy dữ liệu sản phẩm & category ---
  useEffect(() => {
    const loadData = async () => {
      await initDatabase();
      const dbProducts = await fetchProducts();
      const dbCategories = await fetchCategories();

      const mappedProducts: Product[] = dbProducts.map(p => ({
        id: p.id, // giữ number
        name: p.name,
        category: dbCategories.find(c => c.id === p.categoryId)?.name || 'Unknown',
        price: p.price,
        image: p.img,
        description: p.description,
      }));

      setProducts(mappedProducts);

      const catNames = Array.from(new Set(mappedProducts.map(p => p.category)));
      setCategories(catNames);
    };
    loadData();
  }, []);

  // --- Filter logic (lọc theo category và khoảng giá) ---
  const filtered = useMemo(() => {
    const qLower = q.trim().toLowerCase();
    const min = minPrice.trim() === '' ? 0 : parseFloat(minPrice);
    const max = maxPrice.trim() === '' ? Number.MAX_SAFE_INTEGER : parseFloat(maxPrice);

    return products.filter(p => {
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (qLower && !p.name.toLowerCase().includes(qLower) && !p.category.toLowerCase().includes(qLower)) return false;
      if (p.price < min || p.price > max) return false;
      return true;
    });
  }, [products, selectedCategory, q, minPrice, maxPrice]);

  const renderItem = ({ item }: { item: Product }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => {
      if (!user) {
        Alert.alert('⚠️', 'Bạn cần đăng nhập');
        return;
      }
      navigation.navigate('Details', { product: item, user }); // <-- truyền user
    }}
  >
    <Image source={{ uri: item.image }} style={styles.image} />
    <Text style={styles.name}>{item.name}</Text>
    <Text style={styles.price}>{item.price.toLocaleString()} đ</Text>
    <Text style={styles.cat}>{item.category}</Text>
  </TouchableOpacity>
);


  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    Alert.alert('Thông báo', 'Bạn đã đăng xuất');
    navigation.replace('Login');
  };

  return (
    <View style={{ flex: 1 }}>
      <Header username={user?.username} onLogout={handleLogout} />

      <View style={styles.container}>
        <CategorySelector categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />
        <TextInput placeholder="Tìm kiếm theo tên hoặc danh mục" style={styles.input} value={q} onChangeText={setQ} />

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TextInput placeholder="Min giá" style={[styles.input, { width: 100 }]} keyboardType="numeric" value={minPrice} onChangeText={setMinPrice} />
          <TextInput placeholder="Max giá" style={[styles.input, { width: 100 }]} keyboardType="numeric" value={maxPrice} onChangeText={setMaxPrice} />
        </View>

        <Text style={{ marginVertical: 8 }}>Kết quả: {filtered.length} sản phẩm</Text>

        <FlatList
          data={filtered}
          keyExtractor={i => i.id || i.name}
          numColumns={2}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 120 }}
        />
      </View>
    </View>
  );
}

// ---------------- Home with Bottom Tabs ----------------
export default function HomeTabs({ navigation }: Props) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#f4f6f8', height: 60 },
        tabBarLabelStyle: { fontSize: 12, marginBottom: 4 },
      }}
    >
      <Tab.Screen
        name="HomeUser"
        component={HomeContent}
        options={{ tabBarIcon: ({ color, size }) => <Text style={{ fontSize: size, color }}>🏠</Text> }}
      />
      <Tab.Screen
        name="Card"
        component={CardScreen} // import RegisterScreen ở trên hoặc từ stack khác
        options={{ tabBarIcon: ({ color, size }) => <Text style={{ fontSize: size, color }}>➕</Text> }}
      />
      <Tab.Screen
        name="Register"
        component={RegisterScreen} // import RegisterScreen ở trên hoặc từ stack khác
        options={{ tabBarIcon: ({ color, size }) => <Text style={{ fontSize: size, color }}>➕</Text> }}
      />
      <Tab.Screen
        name="Login"
        component={LoginScreen} // import LoginScreen ở trên hoặc từ stack khác
        options={{ tabBarIcon: ({ color, size }) => <Text style={{ fontSize: size, color }}>🔑</Text> }}
      />
    </Tab.Navigator>
  );
}

// ---------------- Styles ----------------
const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 8, marginBottom: 8 },
  card: { flex: 1, margin: 8, backgroundColor: '#fff', padding: 8, borderRadius: 8, alignItems: 'center', elevation: 3 },
  image: { width: 120, height: 100, borderRadius: 8, marginBottom: 8 },
  name: { fontWeight: 'bold', textAlign: 'center' },
  price: { color: '#E91E63', marginTop: 6 },
  cat: { marginTop: 4, fontSize: 12, color: '#666' },
});
