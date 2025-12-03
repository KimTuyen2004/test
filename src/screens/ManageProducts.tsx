// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Modal, TextInput, StyleSheet, Button, Image, Alert } from 'react-native';
// import { fetchProducts, addProduct, updateProduct, deleteProduct, Product, fetchCategories, Category } from '../database/database';
// import { Picker } from '@react-native-picker/picker';

// const PAGE_SIZE = 5;

// export default function ManageProducts() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const [modalVisible, setModalVisible] = useState(false);
//   const [editing, setEditing] = useState<Product|null>(null);
//   const [name,setName] = useState('');
//   const [price,setPrice] = useState('');
//   const [img,setImg] = useState('');
//   const [categoryId,setCategoryId] = useState<number| null>(null);

//   const loadProducts = async(p=1)=>{
//     setLoading(true);
//     const all = await fetchProducts();
//     setTotalPages(Math.ceil(all.length / PAGE_SIZE));
//     setProducts(all.slice((p-1)*PAGE_SIZE,p*PAGE_SIZE));
//     setPage(p);
//     setLoading(false);
//   };

//   const loadCategories = async()=>{
//     const cats = await fetchCategories();
//     setCategories(cats);
//     if(cats.length>0) setCategoryId(cats[0].id);
//   };

//   useEffect(()=>{
//     loadProducts();
//     loadCategories();
//   },[]);

//   const openAdd = ()=>{
//     setEditing(null); setName(''); setPrice(''); setImg(''); setCategoryId(categories[0]?.id||null);
//     setModalVisible(true);
//   };
//   const openEdit = (p:Product)=>{
//     setEditing(p); setName(p.name); setPrice(p.price.toString()); setImg(p.img); setCategoryId(p.categoryId);
//     setModalVisible(true);
//   };

//   const save = async ()=>{
//     if(!name||!price||!img||!categoryId) {Alert.alert('Lỗi','Điền đủ thông tin'); return;}
//     const priceNum = Number(price);
//     if(editing){
//       await updateProduct({...editing,name,name:priceNum,img,categoryId});
//     }else{
//       await addProduct({name,price:priceNum,img,categoryId});
//     }
//     setModalVisible(false);
//     loadProducts(page);
//   };

//   const handleDelete = (id:number)=>{
//     Alert.alert('Xác nhận','Bạn có chắc muốn xóa?',[
//       {text:'Hủy',style:'cancel'},
//       {text:'Xóa',style:'destructive',onPress: async()=>{ await deleteProduct(id); loadProducts(page) }}
//     ]);
//   }

//   const renderItem = ({item}:{item:Product})=>(
//     <View style={styles.card}>
//       <Image source={{uri:item.img}} style={{width:'100%',height:120,borderRadius:6,marginBottom:6}}/>
//       <Text style={{fontWeight:'bold'}}>{item.name}</Text>
//       <Text>Price: {item.price}</Text>
//       <Text>Category: {item.categoryId}</Text>
//       <View style={{flexDirection:'row',marginTop:6}}>
//         <TouchableOpacity style={[styles.pageButton,{marginRight:10}]} onPress={()=>openEdit(item)}>
//           <Text style={{color:'#fff'}}>Sửa</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.deleteButton} onPress={()=>handleDelete(item.id)}>
//           <Text style={{color:'#fff'}}>Xóa</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={{flex:1}}>
//       <TouchableOpacity style={[styles.pageButton,{margin:12}]} onPress={openAdd}>
//         <Text style={{color:'#fff'}}>Thêm sản phẩm</Text>
//       </TouchableOpacity>
//       {loading ? <ActivityIndicator size="large" color="#007aff" style={{marginTop:20}}/> :
//         <FlatList data={products} keyExtractor={item=>item.id.toString()} renderItem={renderItem} contentContainerStyle={{padding:12}}/>
//       }

//       <Modal visible={modalVisible} animationType="slide">
//         <View style={{flex:1,padding:12}}>
//           <Text style={{fontWeight:'bold',fontSize:18, marginBottom:12}}>{editing?'Sửa sản phẩm':'Thêm sản phẩm'}</Text>
//           <TextInput placeholder="Tên" value={name} onChangeText={setName} style={styles.input}/>
//           <TextInput placeholder="Giá" value={price} onChangeText={setPrice} keyboardType="numeric" style={styles.input}/>
//           <TextInput placeholder="URL ảnh" value={img} onChangeText={setImg} style={styles.input}/>
//           <Text>Category:</Text>
//           {/* Picker */}
//           <View style={{borderWidth:1,borderColor:'#ccc',borderRadius:6,marginBottom:12}}>
//             <Picker selectedValue={categoryId} onValueChange={val=>setCategoryId(val as number)}>
//               {categories.map(c=><Picker.Item key={c.id} label={c.name} value={c.id}/>)}
//             </Picker>
//           </View>
//           <View style={{flexDirection:'row'}}>
//             <Button title="Hủy" onPress={()=>setModalVisible(false)}/>
//             <View style={{width:12}}/>
//             <Button title="Lưu" onPress={save}/>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   card:{backgroundColor:'#fff',padding:12,borderRadius:10,marginBottom:12,shadowColor:'#000',shadowOpacity:0.08,shadowOffset:{width:0,height:2},shadowRadius:4,elevation:3},
//   deleteButton:{backgroundColor:'#ff4d4d',paddingVertical:8,paddingHorizontal:12,borderRadius:6,marginTop:6,alignItems:'center'},
//   pageButton:{paddingVertical:8,paddingHorizontal:12,backgroundColor:'#007aff',borderRadius:6,alignItems:'center'},
//   input:{borderWidth:1,borderColor:'#ccc',borderRadius:6,padding:8,marginBottom:12}
// });






// import React, { useEffect, useState } from 'react';
// import { 
//   View, Text, FlatList, TouchableOpacity, ActivityIndicator, Modal, 
//   TextInput, StyleSheet, Button, Image, Alert, Dimensions 
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { 
//   fetchProducts, addProduct, updateProduct, deleteProduct, Product, 
//   fetchCategories, Category 
// } from '../database/database';

// const SCREEN_WIDTH = Dimensions.get('window').width;
// const CARD_WIDTH = (SCREEN_WIDTH - 36) / 2; // 12px padding mỗi bên + 12px giữa

// export default function ManageProducts() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [modalVisible, setModalVisible] = useState(false);
//   const [editing, setEditing] = useState<Product|null>(null);
//   const [name,setName] = useState('');
//   const [price,setPrice] = useState('');
//   const [img,setImg] = useState('');
//   const [categoryId,setCategoryId] = useState<number| null>(null);

//   const loadProducts = async()=>{
//     setLoading(true);
//     const all = await fetchProducts();
//     setProducts(all);
//     setLoading(false);
//   };

//   const loadCategories = async()=>{
//     const cats = await fetchCategories();
//     setCategories(cats);
//     if(cats.length>0) setCategoryId(cats[0].id);
//   };

//   useEffect(()=>{
//     loadProducts();
//     loadCategories();
//   },[]);

//   const openAdd = ()=>{
//     setEditing(null); setName(''); setPrice(''); setImg(''); 
//     setCategoryId(categories[0]?.id||null);
//     setModalVisible(true);
//   };

//   const openEdit = (p:Product)=>{
//     setEditing(p); setName(p.name); setPrice(p.price.toString()); 
//     setImg(p.img); setCategoryId(p.categoryId);
//     setModalVisible(true);
//   };

//   const save = async ()=>{
//     if(!name||!price||!img||!categoryId) {
//       Alert.alert('Lỗi','Điền đủ thông tin'); 
//       return;
//     }
//     const priceNum = Number(price);
//     if(editing){
//       await updateProduct({...editing, name, price:priceNum, img, categoryId});
//     }else{
//       await addProduct({name, price:priceNum, img, categoryId});
//     }
//     setModalVisible(false);
//     loadProducts();
//   };

//   const handleDelete = (id:number)=>{
//     Alert.alert('Xác nhận','Bạn có chắc muốn xóa?',[
//       {text:'Hủy',style:'cancel'},
//       {text:'Xóa',style:'destructive',onPress: async()=>{ 
//         await deleteProduct(id); 
//         loadProducts() 
//       }}
//     ]);
//   }

//   const renderItem = ({item}:{item:Product}) => (
//     <View style={styles.card}>
//       <Image source={{uri:item.img}} style={styles.productImage}/>
//       <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
//       <Text style={styles.productPrice}>${item.price}</Text>
//       <View style={styles.buttonRow}>
//         <TouchableOpacity style={styles.editButton} onPress={()=>openEdit(item)}>
//           <Text style={styles.buttonText}>Sửa</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.deleteButton} onPress={()=>handleDelete(item.id)}>
//           <Text style={styles.buttonText}>Xóa</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={{flex:1}}>
//       <TouchableOpacity style={styles.addButton} onPress={openAdd}>
//         <Text style={{color:'#fff',fontWeight:'bold'}}>Thêm sản phẩm</Text>
//       </TouchableOpacity>

//       {loading ? <ActivityIndicator size="large" color="#007aff" style={{marginTop:20}}/> :
//         <FlatList 
//           data={products} 
//           keyExtractor={item=>item.id.toString()} 
//           renderItem={renderItem} 
//           numColumns={2} 
//           columnWrapperStyle={{justifyContent:'space-between', marginBottom:12}}
//           contentContainerStyle={{paddingHorizontal:12, paddingTop:12}}
//         />
//       }

//       <Modal visible={modalVisible} animationType="slide">
//         <View style={{flex:1,padding:12}}>
//           <Text style={{fontWeight:'bold',fontSize:18, marginBottom:12}}>
//             {editing?'Sửa sản phẩm':'Thêm sản phẩm'}
//           </Text>
//           <TextInput placeholder="Tên" value={name} onChangeText={setName} style={styles.input}/>
//           <TextInput placeholder="Giá" value={price} onChangeText={setPrice} keyboardType="numeric" style={styles.input}/>
//           <TextInput placeholder="URL ảnh" value={img} onChangeText={setImg} style={styles.input}/>
//           <Text>Category:</Text>
//           <View style={{borderWidth:1,borderColor:'#ccc',borderRadius:6,marginBottom:12}}>
//             <Picker selectedValue={categoryId} onValueChange={val=>setCategoryId(val as number)}>
//               {categories.map(c=><Picker.Item key={c.id} label={c.name} value={c.id}/>)}
//             </Picker>
//           </View>
//           <View style={{flexDirection:'row'}}>
//             <Button title="Hủy" onPress={()=>setModalVisible(false)}/>
//             <View style={{width:12}}/>
//             <Button title="Lưu" onPress={save}/>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   card:{
//     backgroundColor:'#fff',
//     width:CARD_WIDTH,
//     borderRadius:12,
//     padding:8,
//     shadowColor:'#000',
//     shadowOpacity:0.05,
//     shadowOffset:{width:0,height:2},
//     shadowRadius:6,
//     elevation:4,
//     overflow:'hidden'
//   },
//   productImage:{
//     width:'100%',
//     height:100,
//     borderRadius:8,
//     marginBottom:6
//   },
//   productName:{
//     fontSize:16,
//     fontWeight:'bold',
//     marginBottom:4
//   },
//   productPrice:{
//     fontSize:14,
//     color:'#007aff',
//     marginBottom:6
//   },
//   buttonRow:{
//     flexDirection:'row',
//     justifyContent:'space-between'
//   },
//   editButton:{
//     backgroundColor:'#007aff',
//     paddingVertical:6,
//     paddingHorizontal:12,
//     borderRadius:6
//   },
//   deleteButton:{
//     backgroundColor:'#ff4d4d',
//     paddingVertical:6,
//     paddingHorizontal:12,
//     borderRadius:6
//   },
//   buttonText:{
//     color:'#fff',
//     fontWeight:'bold'
//   },
//   addButton:{
//     paddingVertical:12,
//     paddingHorizontal:16,
//     backgroundColor:'#007aff',
//     borderRadius:6,
//     alignItems:'center',
//     margin:12
//   },
//   input:{
//     borderWidth:1,
//     borderColor:'#ccc',
//     borderRadius:6,
//     padding:8,
//     marginBottom:12
//   }
// });



import React, { useEffect, useState } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, ActivityIndicator, Modal, 
  TextInput, StyleSheet, Button, Image, Alert, Dimensions 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { 
  fetchProducts, addProduct, updateProduct, deleteProduct, Product, 
  fetchCategories, Category 
} from '../database/database';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = (SCREEN_WIDTH - 36) / 2;

// giả lập upload ảnh → trả về URL
const mockUploadImage = async (uri: string): Promise<string> => {
  return uri; // hoặc upload lên server rồi trả về URL
};

export default function ManageProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<Product|null>(null);
  const [name,setName] = useState('');
  const [price,setPrice] = useState('');
  const [img,setImg] = useState('');
  const [categoryId,setCategoryId] = useState<number| null>(null);

  const loadProducts = async()=>{
    setLoading(true);
    const all = await fetchProducts();
    setProducts(all);
    setLoading(false);
  };

  const loadCategories = async()=>{
    const cats = await fetchCategories();
    setCategories(cats);
    if(cats.length>0) setCategoryId(cats[0].id);
  };

  useEffect(()=>{
    loadProducts();
    loadCategories();
  },[]);

  const openAdd = ()=>{
    setEditing(null); setName(''); setPrice(''); setImg(''); 
    setCategoryId(categories[0]?.id||null);
    setModalVisible(true);
  };

  const openEdit = (p:Product)=>{
    setEditing(p); setName(p.name); setPrice(p.price.toString()); 
    setImg(p.img); setCategoryId(p.categoryId);
    setModalVisible(true);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.cancelled) {
      setImg(result.uri);
    }
  };

  const save = async ()=>{
    if(!name||!price||!img||!categoryId) {
      Alert.alert('Lỗi','Điền đủ thông tin'); 
      return;
    }

    const uploadedUrl = await mockUploadImage(img); // upload và lấy URL
    const priceNum = Number(price);

    if(editing){
      await updateProduct({...editing, name, price:priceNum, img:uploadedUrl, categoryId});
    }else{
      await addProduct({name, price:priceNum, img:uploadedUrl, categoryId});
    }

    setModalVisible(false);
    loadProducts();
  };

  const handleDelete = (id:number)=>{
    Alert.alert('Xác nhận','Bạn có chắc muốn xóa?',[
      {text:'Hủy',style:'cancel'},
      {text:'Xóa',style:'destructive',onPress: async()=>{ 
        await deleteProduct(id); 
        loadProducts() 
      }}
    ]);
  };

  const renderItem = ({item}:{item:Product}) => (
    <View style={styles.card}>
      <Image source={{uri:item.img}} style={styles.productImage}/>
      <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.editButton} onPress={()=>openEdit(item)}>
          <Text style={styles.buttonText}>Sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={()=>handleDelete(item.id)}>
          <Text style={styles.buttonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{flex:1}}>
      <TouchableOpacity style={styles.addButton} onPress={openAdd}>
        <Text style={{color:'#fff',fontWeight:'bold'}}>Thêm sản phẩm</Text>
      </TouchableOpacity>

      {loading ? <ActivityIndicator size="large" color="#007aff" style={{marginTop:20}}/> :
        <FlatList 
          data={products} 
          keyExtractor={item=>item.id.toString()} 
          renderItem={renderItem} 
          numColumns={2} 
          columnWrapperStyle={{justifyContent:'space-between', marginBottom:12}}
          contentContainerStyle={{paddingHorizontal:12, paddingTop:12}}
        />
      }

      <Modal visible={modalVisible} animationType="slide">
        <View style={{flex:1,padding:12}}>
          <Text style={{fontWeight:'bold',fontSize:18, marginBottom:12}}>
            {editing?'Sửa sản phẩm':'Thêm sản phẩm'}
          </Text>
          <TextInput placeholder="Tên" value={name} onChangeText={setName} style={styles.input}/>
          <TextInput placeholder="Giá" value={price} onChangeText={setPrice} keyboardType="numeric" style={styles.input}/>
          
          <Button title={img?'Thay ảnh':'Chọn ảnh'} onPress={pickImage}/>
          {img && <Image source={{uri: img}} style={{width:100,height:100,marginVertical:8,borderRadius:6}}/>}

          <Text>Category:</Text>
          <View style={{borderWidth:1,borderColor:'#ccc',borderRadius:6,marginBottom:12}}>
            <Picker selectedValue={categoryId} onValueChange={val=>setCategoryId(val as number)}>
              {categories.map(c=><Picker.Item key={c.id} label={c.name} value={c.id}/>)}
            </Picker>
          </View>
          <View style={{flexDirection:'row'}}>
            <Button title="Hủy" onPress={()=>setModalVisible(false)}/>
            <View style={{width:12}}/>
            <Button title="Lưu" onPress={save}/>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  card:{
    backgroundColor:'#fff',
    width:CARD_WIDTH,
    borderRadius:12,
    padding:8,
    shadowColor:'#000',
    shadowOpacity:0.05,
    shadowOffset:{width:0,height:2},
    shadowRadius:6,
    elevation:4,
    overflow:'hidden'
  },
  productImage:{
    width:'100%',
    height:100,
    borderRadius:8,
    marginBottom:6
  },
  productName:{
    fontSize:16,
    fontWeight:'bold',
    marginBottom:4
  },
  productPrice:{
    fontSize:14,
    color:'#007aff',
    marginBottom:6
  },
  buttonRow:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  editButton:{
    backgroundColor:'#007aff',
    paddingVertical:6,
    paddingHorizontal:12,
    borderRadius:6
  },
  deleteButton:{
    backgroundColor:'#ff4d4d',
    paddingVertical:6,
    paddingHorizontal:12,
    borderRadius:6
  },
  buttonText:{
    color:'#fff',
    fontWeight:'bold'
  },
  addButton:{
    paddingVertical:12,
    paddingHorizontal:16,
    backgroundColor:'#007aff',
    borderRadius:6,
    alignItems:'center',
    margin:12
  },
  input:{
    borderWidth:1,
    borderColor:'#ccc',
    borderRadius:6,
    padding:8,
    marginBottom:12
  }
});
