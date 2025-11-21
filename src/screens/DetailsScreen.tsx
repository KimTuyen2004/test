import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Product } from '../components/Type'; // hoặc './AppNavigator' nếu chưa tách type

type Props = NativeStackScreenProps<any, 'Details'>;

export default function DetailsScreen({ route, navigation }: Props) {
  const { product } = route.params as { product: Product };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price.toLocaleString()} đ</Text>
      <Text style={styles.cat}>{product.category}</Text>
      <Text style={{ marginTop: 12 }}>{product.description}</Text>

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
});
