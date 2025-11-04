import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ProductCard from './ProductCard';

const Card = () => {
  const products = [
    { id: 1, name: 'Product 1', price: '$20', image: 'https://news.khangz.com/wp-content/uploads/2025/09/iphone-17-pro-max-10.jpg' },
    { id: 2, name: 'Product 2', price: '$35', image: 'https://news.khangz.com/wp-content/uploads/2025/09/iphone-17-pro-max-10.jpg' },
    { id: 3, name: 'Product 3', price: '$50', image: 'https://news.khangz.com/wp-content/uploads/2025/09/iphone-17-pro-max-10.jpg' },
    { id: 4, name: 'Product 4', price: '$45', image: 'https://news.khangz.com/wp-content/uploads/2025/09/iphone-17-pro-max-10.jpg' },
    { id: 5, name: 'Product 5', price: '$60', image: 'https://news.khangz.com/wp-content/uploads/2025/09/iphone-17-pro-max-10.jpg' },
    { id: 6, name: 'Product 6', price: '$70', image: 'https://news.khangz.com/wp-content/uploads/2025/09/iphone-17-pro-max-10.jpg' },
  ];


  const [students, setStudent]
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>🌟 My Product List 🌟</Text>
      </View>

      {/* Product List */}
      <FlatList
        data={products}
        keyExtractor={(_, index) => index.toString()} // hoặc item.id.toString()
        numColumns={3} // 👉 hiển thị 3 sản phẩm trên 1 hàng
        renderItem={({ item }) => (
          <ProductCard
            name={item.name}
            price={item.price}
            image={item.image}
          />
        )}
        contentContainerStyle={styles.listContent}
      />

      const

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 My Shop — All Rights Reserved</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8E7' },
  header: {
    backgroundColor: '#FFD700',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  headerText: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  footer: {
    backgroundColor: '#FF69B4',
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    elevation: 8,
  },
  footerText: { color: '#fff', fontSize: 14, fontWeight: '600' },
});

export default Card;
