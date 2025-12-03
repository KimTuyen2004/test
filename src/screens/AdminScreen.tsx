// import React, { useState, useEffect } from 'react';
// import { View, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Header from '../components/Header';
// import ManageUsers from './ManageUsers';
// import ManageProducts from './ManageProducts';
// import Home from './Home';
// import RegisterScreen from './RegisterScreen';
// import LoginScreen from './LoginScreen';

// const Tab = createBottomTabNavigator();

// function AdminHome() {
//   const [activeTab, setActiveTab] = useState<'users'|'products'>('users');
//   const [currentUser,setCurrentUser] = useState<any>(null);

//   useEffect(()=>{
//     AsyncStorage.getItem('user').then(json=>{
//       if(json) setCurrentUser(JSON.parse(json));
//     })
//   },[]);

//   return (
//     <View style={{flex:1,backgroundColor:'#f4f6f8'}}>
//       <Header username={currentUser?.username} onLogout={async ()=>{
//         await AsyncStorage.removeItem('user');
//         Alert.alert('Thông báo','Bạn đã đăng xuất');
//       }}/>

//       {/* Menu ngang */}
//       <ScrollView horizontal style={{padding:12}} showsHorizontalScrollIndicator={false}>
//         <TouchableOpacity onPress={()=>setActiveTab('users')}>
//           <Text style={{marginRight:20,fontWeight:activeTab==='users'?'bold':'normal', color:activeTab==='users'?'#007aff':'#000'}}>Quản lý User</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={()=>setActiveTab('products')}>
//           <Text style={{marginRight:20,fontWeight:activeTab==='products'?'bold':'normal', color:activeTab==='products'?'#007aff':'#000'}}>Quản lý Sản phẩm</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* Nội dung */}
//       {activeTab==='users' ? <ManageUsers/> : <ManageProducts/>}
//     </View>
//   );
// }

// // --- BottomTabs ---
// export default function AdminScreen() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: { backgroundColor: '#f4f6f8', height: 60 },
//         tabBarLabelStyle: { fontSize: 12, marginBottom: 4 },
//       }}
//     >
//       <Tab.Screen
//         name="Home Admin"
//         component={AdminHome}
//         options={{ tabBarIcon: ({ color, size }) => <Text style={{ fontSize:size, color }}>👤</Text> }}
//       />
//       <Tab.Screen
//         name="Home User"
//         component={Home}
//         options={{ tabBarIcon: ({ color, size }) => <Text style={{ fontSize:size, color }}>🏠</Text> }}
//       />
//       <Tab.Screen
//         name="Register"
//         component={RegisterScreen}
//         options={{ tabBarIcon: ({ color, size }) => <Text style={{ fontSize:size, color }}>➕</Text> }}
//       />
//       <Tab.Screen
//         name="Login"
//         component={LoginScreen}
//         options={{ tabBarIcon: ({ color, size }) => <Text style={{ fontSize:size, color }}>🔑</Text> }}
//       />
//     </Tab.Navigator>
//   );
// }


// AdminScreen.tsx
// import React, { useState, useEffect } from 'react';
// import { View, ScrollView, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import Header from '../components/Header';
// import ManageUsers from './ManageUsers';
// import ManageProducts from './ManageProducts';
// import Home from './Home';
// import RegisterScreen from './RegisterScreen';
// import LoginScreen from './LoginScreen';

// const Tab = createBottomTabNavigator();

// function AdminHome() {
//   const [activeTab, setActiveTab] = useState<'users'|'products'|'categories'>('users');
//   const [currentUser, setCurrentUser] = useState<any>(null);

//   useEffect(() => {
//     AsyncStorage.getItem('user').then(json => {
//       if (json) setCurrentUser(JSON.parse(json));
//     });
//   }, []);

//   return (
//     <View style={{ flex: 1, backgroundColor: '#f4f6f8' }}>
//       {/* Header */}
//       <Header 
//         username={currentUser?.username} 
//         onLogout={async () => {
//           await AsyncStorage.removeItem('user');
//           Alert.alert('Thông báo', 'Bạn đã đăng xuất');
//         }}
//       />

//       {/* Menu ngang */}
//       <ScrollView horizontal style={styles.menu} showsHorizontalScrollIndicator={false}>
//         <TouchableOpacity onPress={() => setActiveTab('users')}>
//           <Text style={[styles.menuItem, activeTab === 'users' && styles.activeMenuItem]}>Quản lý User</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setActiveTab('products')}>
//           <Text style={[styles.menuItem, activeTab === 'products' && styles.activeMenuItem]}>Quản lý Sản phẩm</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setActiveTab('categories')}>
//           <Text style={[styles.menuItem, activeTab === 'categories' && styles.activeMenuItem]}>Quản lý Loại Sản phẩm</Text>
//         </TouchableOpacity>
//       </ScrollView>


//       {/* Nội dung */}
//       <View style={{ flex: 50 }}>
//         {activeTab === 'users' && <ManageUsers />}
//   {activeTab === 'products' && <ManageProducts />}
//   {activeTab === 'categories' && <ManageCategories />}
//       </View>
//     </View>
//   );
// }

// export default function AdminScreen() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: { backgroundColor: '#f4f6f8', height: 60 },
//         tabBarLabelStyle: { fontSize: 12, marginBottom: 4 },
//       }}
//     >
//       <Tab.Screen
//         name="Home Admin"
//         component={AdminHome}
//         options={{ tabBarIcon: ({ color, size }) => <Text style={{ fontSize:size, color }}>👤</Text> }}
//       />
//       <Tab.Screen
//         name="Home User"
//         component={Home}
//         options={{ tabBarIcon: ({ color, size }) => <Text style={{ fontSize:size, color }}>🏠</Text> }}
//       />
//       <Tab.Screen
//         name="Register"
//         component={RegisterScreen}
//         options={{ tabBarIcon: ({ color, size }) => <Text style={{ fontSize:size, color }}>➕</Text> }}
//       />
//       <Tab.Screen
//         name="Login"
//         component={LoginScreen}
//         options={{ tabBarIcon: ({ color, size }) => <Text style={{ fontSize:size, color }}>🔑</Text> }}
//       />
//     </Tab.Navigator>
//   );
// }

// const styles = StyleSheet.create({
//   menu: { paddingVertical: 12, paddingHorizontal: 12 },
//   menuItem: { marginRight: 20, fontWeight: 'normal', color: '#000' },
//   activeMenuItem: { fontWeight: 'bold', color: '#007aff' },
// });



// // AdminScreen.tsx
// import React, { useState, useEffect } from 'react';
// import { View, ScrollView, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import Header from '../components/Header';
// import ManageUsers from './ManageUsers';
// import ManageProducts from './ManageProducts';
// import ManageCategories from './ManageCategories';
// import Home from './Home';
// import RegisterScreen from './RegisterScreen';
// import LoginScreen from './LoginScreen';
// import { useNavigation } from '@react-navigation/native';
// const Tab = createBottomTabNavigator();
// const navigation = useNavigation();
// function AdminHome() {
//   const [activeTab, setActiveTab] = useState<'users'|'products'|'categories'>('users');
//   const [currentUser, setCurrentUser] = useState<any>(null);
  
//   useEffect(() => {
//     AsyncStorage.getItem('user').then(json => {
//       if (json) setCurrentUser(JSON.parse(json));
//     });
//   }, []);

//   return (
//     <View style={{ flex: 1, backgroundColor: '#f4f6f8' }}>
//          {/* Header */}
//        <Header 
//          username={currentUser?.username} 
//          onLogout={async () => {
//            await AsyncStorage.removeItem('user');
//            Alert.alert('Thông báo', 'Bạn đã đăng xuất');
//             navigation.replace('Login');

//          }}
//        />

//       {/* Menu ngang */}
//       <ScrollView horizontal style={styles.menu} showsHorizontalScrollIndicator={false}>
//         <TouchableOpacity onPress={() => setActiveTab('users')}>
//           <Text style={[styles.menuItem, activeTab === 'users' && styles.activeMenuItem]}>Manage Users</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setActiveTab('products')}>
//           <Text style={[styles.menuItem, activeTab === 'products' && styles.activeMenuItem]}>Manage Products</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setActiveTab('categories')}>
//           <Text style={[styles.menuItem, activeTab === 'categories' && styles.activeMenuItem]}>Manage Categories</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* Nội dung tab */}
//       <View style={{ flex: 50 }}>
//         {activeTab === 'users' && <ManageUsers />}
//         {activeTab === 'products' && <ManageProducts />}
//         {activeTab === 'categories' && <ManageCategories />}
//       </View>
//     </View>
//   );
// }

// export default function AdminScreen() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: { backgroundColor: '#f4f6f8', height: 60 },
//         tabBarLabelStyle: { fontSize: 12, marginBottom: 4 },
//       }}
//     >
//       <Tab.Screen
//         name="Home Admin"
//         component={AdminHome}
//         options={{ tabBarIcon: ({ color, size }) => <Text style={{ fontSize:size, color }}>👤</Text> }}
//       />
//       <Tab.Screen
//         name="Home User"
//         component={Home}
//         options={{ tabBarIcon: ({ color, size }) => <Text style={{ fontSize:size, color }}>🏠</Text> }}
//       />
//       <Tab.Screen
//         name="Register"
//         component={RegisterScreen}
//         options={{ tabBarIcon: ({ color, size }) => <Text style={{ fontSize:size, color }}>➕</Text> }}
//       />
//       <Tab.Screen
//         name="Login"
//         component={LoginScreen}
//         options={{ tabBarIcon: ({ color, size }) => <Text style={{ fontSize:size, color }}>🔑</Text> }}
//       />
//     </Tab.Navigator>
//   );
// }

// const styles = StyleSheet.create({
//   menu: { flexDirection:'row', paddingVertical: 12, paddingHorizontal: 12, backgroundColor:'#f4f6f8' },
//   menuItem: { marginRight: 20, fontWeight: 'normal', color: '#000' },
//   activeMenuItem: { fontWeight: 'bold', color: '#007aff', textDecorationLine:'underline' },
// });

// AdminScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, CommonActions } from '@react-navigation/native';

import Header from '../components/Header';
import ManageUsers from './ManageUsers';
import ManageProducts from './ManageProducts';
import ManageCategories from './ManageCategories';
import Home from './Home';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator'; // import file AppNavigator.tsx của bạn

const Tab = createBottomTabNavigator();

// --- Navigation type cho AdminHome ---
type AdminHomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Admin'>;

function AdminHome() {
  const [activeTab, setActiveTab] = useState<'users' | 'products' | 'categories'>('users');
  const [currentUser, setCurrentUser] = useState<any>(null);

  const navigation = useNavigation<AdminHomeNavigationProp>();

  useEffect(() => {
    AsyncStorage.getItem('user').then(json => {
      if (json) setCurrentUser(JSON.parse(json));
    });
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    Alert.alert('Thông báo', 'Bạn đã đăng xuất');
    // Reset stack, không cho back vào Admin
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f4f6f8' }}>
      {/* Header */}
      <Header username={currentUser?.username} onLogout={handleLogout} />

      {/* Menu ngang */}
      <ScrollView horizontal style={styles.menu} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity onPress={() => setActiveTab('users')}>
          <Text style={[styles.menuItem, activeTab === 'users' && styles.activeMenuItem]}>Manage Users</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('products')}>
          <Text style={[styles.menuItem, activeTab === 'products' && styles.activeMenuItem]}>Manage Products</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('categories')}>
          <Text style={[styles.menuItem, activeTab === 'categories' && styles.activeMenuItem]}>Manage Categories</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Nội dung tab */}
      <View style={{ flex: 50 }}>
        {activeTab === 'users' && <ManageUsers />}
        {activeTab === 'products' && <ManageProducts />}
        {activeTab === 'categories' && <ManageCategories />}
      </View>
    </View>
  );
}

export default function AdminScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#f4f6f8', height: 60 },
        tabBarLabelStyle: { fontSize: 12, marginBottom: 4 },
      }}
    >
      <Tab.Screen
        name="Home Admin"
        component={AdminHome}
        options={{ tabBarIcon: ({ color, size }) => <Text style={{ fontSize: size, color }}>👤</Text> }}
      />
      <Tab.Screen
        name="Home User"
        component={Home}
        options={{ tabBarIcon: ({ color, size }) => <Text style={{ fontSize: size, color }}>🏠</Text> }}
      />
      <Tab.Screen
        name="Register"
        component={RegisterScreen}
        options={{ tabBarIcon: ({ color, size }) => <Text style={{ fontSize: size, color }}>➕</Text> }}
      />
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{ tabBarIcon: ({ color, size }) => <Text style={{ fontSize: size, color }}>🔑</Text> }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  menu: { flexDirection: 'row', paddingVertical: 12, paddingHorizontal: 12, backgroundColor: '#f4f6f8' },
  menuItem: { marginRight: 20, fontWeight: 'normal', color: '#000' },
  activeMenuItem: { fontWeight: 'bold', color: '#007aff', textDecorationLine: 'underline' },
});
