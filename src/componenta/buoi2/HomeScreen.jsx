import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";

const products = [
  {
    id: "1",
    name: "T-Shirt Basic",
    price: "250.000 đ",
    image: "https://i.imgur.com/2nCt3Sb.png",
  },
  {
    id: "2",
    name: "Jeans Slim Fit",
    price: "499.000 đ",
    image: "https://i.imgur.com/DvpvklR.png",
  },
  {
    id: "3",
    name: "Hoodie Unisex",
    price: "350.000 đ",
    image: "https://i.imgur.com/1bX5QH6.png",
  },
];

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách sản phẩm</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Detail", { product: item })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    margin: 8,
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  price: {
    fontSize: 14,
    color: "gray",
  },
});
