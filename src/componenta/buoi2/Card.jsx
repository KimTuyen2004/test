import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image,
  FlatList, StyleSheet
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

import {
  initDatabase,
  fetchCategories,
  fetchProducts,
  addProduct,
  Product,
  Category,
} from '../../src/database/database';

const Card = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState<number>(1);
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      await initDatabase();
      await loadData();
    })();
  }, []);

  const loadData = async () => {
    const cats = await fetchCategories();
    const prods = await fetchProducts();
    setCategories(cats);
    setProducts(prods.reverse());
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleAddProduct = async () => {
    if (!name || !price) return;

    const newProduct = {
      name,
      price: parseFloat(price),
      img: imageUri || '',
      categoryId,
    };

    await addProduct(newProduct);

    setName('');
    setPrice('');
    setImageUri(null);
    setCategoryId(1);

    await loadData();
  };

  const getImageSource = (img: string) => {
    if (img && img.startsWith('file://')) {
      return { uri: img };
    }
    return require('../../assets/images/productImg/banhkeo.jpg');
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Image source={getImageSource(item.img)} style={styles.image} />

      <View style={styles.cardInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text>{item.price.toLocaleString()} đ</Text>

        <Text style={{ fontSize: 12, color: '#555' }}>
          Danh mục: {categories.find(c => c.id === item.categoryId)?.name || 'N/A'}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản lý sản phẩm</Text>

      <TextInput
        style={styles.input}
        placeholder="Tên sản phẩm"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Giá sản phẩm"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      {/* Picker chọn danh mục */}
      <Picker
        selectedValue={categoryId}
        onValueChange={(value) => setCategoryId(value)}
        style={styles.picker}
      >
        {categories.map(cat => (
          <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
        ))}
      </Picker>

      <TouchableOpacity style={styles.imagePicker} onPress={handlePickImage}>
        <Text style={styles.buttonText}>
          {imageUri ? 'Chọn lại hình ảnh' : 'Chọn hình ảnh'}
        </Text>
      </TouchableOpacity>

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.selectedImage} />
      )}

      <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>Thêm sản phẩm</Text>
      </TouchableOpacity>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ textAlign: 'center' }}>Không có sản phẩm nào</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },

  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  picker: {
    height: 45,
    marginBottom: 15,
    borderColor: '#aaa',
    borderWidth: 1,
  },

  button: {
    backgroundColor: '#28a',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 20,
  },

  imagePicker: {
    backgroundColor: '#8a2be2',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 20,
  },

  buttonText: { color: '#fff', fontWeight: 'bold' },

  selectedImage: {
    width: 100,
    height: 100,
    marginVertical: 10,
    alignSelf: 'center',
  },

  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },

  image: { width: 80, height: 80 },

  cardInfo: { flex: 1, padding: 10, justifyContent: 'center' },

  productName: { fontWeight: 'bold', fontSize: 16 },
});

export default Card;
