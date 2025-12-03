import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Product, User } from '../components/Type';
import { addToCart, placeOrder } from '../database/database';

type Props = NativeStackScreenProps<any, 'Details'>;

export default function DetailsScreen({ route, navigation }: Props) {
  // Nhận product và user từ Home
  const { product, user } = route.params as { product: Product; user: User };
  const [loading, setLoading] = useState(false);

  // --- Thêm vào giỏ hàng ---
  const handleAddToCart = async () => {
    if (!user) return Alert.alert('⚠️', 'Bạn cần đăng nhập để thêm vào giỏ hàng');
    setLoading(true);
    try {
      await addToCart(user.id, product.id, 1); // số lượng mặc định 1
      Alert.alert('✅', 'Đã thêm vào giỏ hàng');
    } catch (error) {
      console.log('AddToCart error:', error);
      Alert.alert('❌', 'Thêm giỏ hàng thất bại');
    }
    setLoading(false);
  };

  // --- Đặt hàng ngay ---
  const handleOrderNow = async () => {
    if (!user) return Alert.alert('⚠️', 'Bạn cần đăng nhập để đặt hàng');
    setLoading(true);
    try {
      // Thêm sản phẩm vào giỏ tạm
      await addToCart(user.id, product.id, 1);
      // Thanh toán luôn
      await placeOrder(user.id);
      Alert.alert('✅', 'Đặt hàng thành công!');
    } catch (error) {
      console.log('OrderNow error:', error);
      Alert.alert('❌', 'Đặt hàng thất bại!');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price.toLocaleString()} đ</Text>
      <Text style={styles.cat}>{product.category}</Text>
      <Text style={{ marginTop: 12 }}>{product.description}</Text>

      {/* Nút hành động */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cartButton]}
          onPress={handleAddToCart}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.orderButton]}
          onPress={handleOrderNow}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Order Now</Text>
        </TouchableOpacity>
      </View>

      {/* Quay lại */}
      <View style={{ marginTop: 20 }}>
        <Button title="Quay lại" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 16 },
  image: { width: 260, height: 200, borderRadius: 8 },
  name: { fontSize: 22, fontWeight: 'bold', marginTop: 12 },
  price: { color: '#E91E63', fontSize: 18, marginTop: 8 },
  cat: { color: '#666', marginTop: 6 },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cartButton: { backgroundColor: '#FF9800' },
  orderButton: { backgroundColor: '#4CAF50' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
