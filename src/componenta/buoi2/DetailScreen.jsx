import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function DetailScreen({ route }) {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20 },
  image: { width: 250, height: 250, borderRadius: 12 },
  name: { fontSize: 22, fontWeight: "bold", marginTop: 20 },
  price: { fontSize: 18, color: "gray", marginTop: 10 },
});
