import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';


const ProductCard = ({ name, price, image }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>{price}</Text>
      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyText}>Mua ngay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 260,
    backgroundColor: '#fff',
    borderRadius: 14,
    marginHorizontal: 10,
    alignItems: 'center',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
    ...Platform.select({
      ios: {
        shadowColor: '#333',
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
    }),
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#f2f2f2',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontSize: 14,
    color: '#888',
    marginVertical: 4,
  },
  buyButton: {
    backgroundColor: 'orange',
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 6,
  },
  buyText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default ProductCard;
