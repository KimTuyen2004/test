// src/screens/CartScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem, Product, User } from '../components/Type';
import { 
  getCartByUser, 
  getProductById, 
  clearCart, 
  placeOrder, 
  fetchCategories 
} from '../database/database';

export default function CartScreen({ navigation }: any) {
  const [user, setUser] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState<(CartItem & { product?: Product })[]>([]);
  const [loading, setLoading] = useState(false);

  // --- Load user ---
  useEffect(() => {
    const fetchUser = async () => {
      const json = await AsyncStorage.getItem('user');
      if (!json) {
        Alert.alert('⚠️', 'Bạn cần đăng nhập');
        navigation.replace('Login');
        return;
      }
      const currentUser: User = JSON.parse(json);
      setUser(currentUser);
      loadCart(currentUser.id);
    };
    fetchUser();
  }, []);

  // --- Load cart + product + category ---
  const loadCart = async (userId: number) => {
    try {
      const dbCart = await getCartByUser(userId);
      const categories = await fetchCategories(); // <-- Lấy category từ DB

      const mappedCart = await Promise.all(
        dbCart.map(async (item) => {
          const dbProduct = await getProductById(item.productId);

          let product: Product | undefined;

          if (dbProduct) {
            const categoryName =
              categories.find(c => c.id === dbProduct.categoryId)?.name || 'Unknown';

            product = {
              id: dbProduct.id,
              name: dbProduct.name,
              category: categoryName, // <-- FIX category
              price: dbProduct.price,
              image: dbProduct.img,
              description: dbProduct.description,
            };
          }

          return {
            id: item.id!,
            productId: item.productId,
            quantity: item.quantity,
            userId: item.userId,
            product,
          };
        })
      );

      setCartItems(mappedCart);
    } catch (error) {
      console.log('LoadCart error:', error);
    }
  };

  // --- Clear cart ---
  const handleClearCart = async () => {
    if (!user) return;
    await clearCart(user.id);
    setCartItems([]);
    Alert.alert('✅', 'Đã xóa toàn bộ giỏ hàng');
  };

  // --- Place order ---
  const handlePlaceOrder = async () => {
    if (!user) return;
    setLoading(true);

    try {
      await placeOrder(user.id);
      Alert.alert('✅', 'Đặt hàng thành công!');
      setCartItems([]);
    } catch (err) {
      console.log("Order error:", err);
      Alert.alert('❌', 'Đặt hàng thất bại');
    }

    setLoading(false);
  };

  // --- Total price ---
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  const renderItem = ({ item }: { item: CartItem & { product?: Product } }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.product?.image }} style={styles.image} />

      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.name}>{item.product?.name}</Text>
        <Text style={styles.cat}>Danh mục: {item.product?.category}</Text>

        <Text style={styles.price}>
          {item.product?.price.toLocaleString()} đ x {item.quantity}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Text style={styles.title}>Giỏ hàng của {user?.username}</Text>

      {cartItems.length === 0 ? (
        <Text>Giỏ hàng trống</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 120 }}
        />
      )}

      <View style={styles.footer}>
        <Text style={styles.total}>Tổng cộng: {totalPrice.toLocaleString()} đ</Text>

        <View style={{ flexDirection: 'row', gap: 12 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={handlePlaceOrder}
            disabled={loading || cartItems.length === 0}
          >
            <Text style={styles.buttonText}>Đặt hàng</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#FF5252' }]}
            onPress={handleClearCart}
            disabled={cartItems.length === 0}
          >
            <Text style={styles.buttonText}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  card: { flexDirection: 'row', padding: 12, backgroundColor: '#fff', borderRadius: 8, marginBottom: 12, elevation: 3 },
  image: { width: 80, height: 60, borderRadius: 6 },
  name: { fontSize: 16, fontWeight: 'bold' },
  cat: { marginTop: 2, color: '#777' },
  price: { marginTop: 4, color: '#E91E63' },
  footer: { marginTop: 20 },
  total: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  button: { flex: 1, backgroundColor: '#4CAF50', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
