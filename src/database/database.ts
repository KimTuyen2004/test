
// import * as SQLite from 'expo-sqlite';

// // --- Database singleton ---
// let db: SQLite.SQLiteDatabase | null = null;

// export const getDb = async () => {
//   if (!db) {
//     db = await SQLite.openDatabaseAsync('myDatabase_3.db'); // DB mới
//   }
//   return db;
// };

// // --- Types ---
// export type Category = { id: number; name: string };
// export type Product = {
//   id: number;
//   name: string;
//   price: number;
//   img: string;
//   categoryId: number;
//   description?: string;
// };
// export type User = { id: number; username: string; password: string; role: 'admin' | 'user' };

// // --- Dữ liệu mẫu ---
// const initialCategories: Category[] = [
//   { id: 1, name: 'Cà phê' },
//   { id: 2, name: 'Trà sữa' },
//   { id: 3, name: 'Trà hoa quả' },
//   { id: 4, name: 'Sinh tố' },
//   { id: 5, name: 'Nước ép' },
// ];

// const initialProducts: Product[] = [
//   { id: 1, name: 'Cà phê sữa đá', price: 30000, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU6UWI4h6QMr8rdfqmdTFuL8iDdst8VLDRlg&s', categoryId: 1, description: 'Cà phê pha phin + sữa đặc' },
//   { id: 2, name: 'Cà phê đen', price: 25000, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU6UWI4h6QMr8rdfqmdTFuL8iDdst8VLDRlg&s', categoryId: 1 },
//   { id: 3, name: 'Trà sữa trân châu', price: 45000, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU6UWI4h6QMr8rdfqmdTFuL8iDdst8VLDRlg&s', categoryId: 2, description: 'Trà sữa béo + trân châu dai' },
//   { id: 4, name: 'Trà đào cam sả', price: 40000, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU6UWI4h6QMr8rdfqmdTFuL8iDdst8VLDRlg&s', categoryId: 3, description: 'Trà trái cây tươi mát' },
//   { id: 5, name: 'Sinh tố bơ', price: 50000, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU6UWI4h6QMr8rdfqmdTFuL8iDdst8VLDRlg&s', categoryId: 4, description: 'Sinh tố bơ tươi + sữa' },
//   { id: 6, name: 'Nước ép cam', price: 35000, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU6UWI4h6QMr8rdfqmdTFuL8iDdst8VLDRlg&s', categoryId: 5, description: 'Nước ép cam tươi nguyên chất' },
// ];

// const initialUsers: User[] = [
//   { id: 1, username: 'admin', password: '123456', role: 'admin' },
// ];

// // --- Khởi tạo database ---
// export const initDatabase = async (onSuccess?: () => void) => {
//   try {
//     const database = await getDb();

//     await database.execAsync(`
//       CREATE TABLE IF NOT EXISTS categories (
//         id INTEGER PRIMARY KEY,
//         name TEXT
//       );
//     `);

//     await database.execAsync(`
//       CREATE TABLE IF NOT EXISTS products (
//         id INTEGER PRIMARY KEY,
//         name TEXT,
//         price REAL,
//         img TEXT,
//         categoryId INTEGER,
//         description TEXT,
//         FOREIGN KEY (categoryId) REFERENCES categories(id)
//       );
//     `);

//     await database.execAsync(`
//       CREATE TABLE IF NOT EXISTS users (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         username TEXT UNIQUE,
//         password TEXT,
//         role TEXT
//       );
//     `);

//     for (const category of initialCategories) {
//       await database.runAsync(
//         'INSERT OR REPLACE INTO categories (id, name) VALUES (?, ?)',
//         [category.id, category.name]
//       );
//     }

//     for (const product of initialProducts) {
//       await database.runAsync(
//         'INSERT OR REPLACE INTO products (id, name, price, img, categoryId, description) VALUES (?, ?, ?, ?, ?, ?)',
//         [product.id, product.name, product.price, product.img, product.categoryId, product.description || null]
//       );
//     }

//     for (const user of initialUsers) {
//       await database.runAsync(
//         'INSERT OR IGNORE INTO users (id, username, password, role) VALUES (?, ?, ?, ?)',
//         [user.id, user.username, user.password, user.role]
//       );
//     }

//     console.log('✅ Database initialized');
//     onSuccess && onSuccess();
//   } catch (error) {
//     console.error('❌ initDatabase error:', error);
//   }
// };

// // --- CRUD Categories ---
// export const fetchCategories = async (): Promise<Category[]> => {
//   const database = await getDb();
//   return await database.getAllAsync<Category>('SELECT * FROM categories');
// };

// // --- CRUD Products ---
// export const fetchProducts = async (): Promise<Product[]> => {
//   const database = await getDb();
//   return await database.getAllAsync<Product>('SELECT * FROM products');
// };

// // --- CRUD Users ---
// export const fetchUsers = async (): Promise<User[]> => {
//   const database = await getDb();
//   return await database.getAllAsync<User>('SELECT * FROM users');
// };

// // --- Đăng ký user mới ---
// export const registerUser = async (username: string, password: string): Promise<boolean> => {
//   try {
//     const database = await getDb();

//     const existing = await database.getFirstAsync<User>(
//       'SELECT * FROM users WHERE username = ?',
//       [username]
//     );
//     if (existing) return false;

//     await database.runAsync(
//       'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
//       [username, password, 'user']
//     );

//     return true;
//   } catch (error) {
//     console.error('❌ registerUser error:', error);
//     return false;
//   }
// };

// // --- Lấy user theo credentials (Login) ---
// export const getUserByCredentials = async (username: string, password: string): Promise<User | null> => {
//   const database = await getDb();
//   const user = await database.getFirstAsync<User>(
//     'SELECT * FROM users WHERE username = ? AND password = ?',
//     [username, password]
//   );
//   return user ?? null;
// };



// // ===============================
// // ✅ THÊM PHẦN SEARCH Ở CUỐI FILE
// // ===============================

// // --- Search product by name ---
// export const searchProductsByName = async (keyword: string): Promise<Product[]> => {
//   const database = await getDb();
//   const key = `%${keyword.toLowerCase()}%`;

//   return await database.getAllAsync<Product>(
//     `SELECT * FROM products WHERE LOWER(name) LIKE ?`,
//     [key]
//   );
// };

// // --- Filter by price range ---
// export const searchProductsByPriceRange = async (min: number, max: number): Promise<Product[]> => {
//   const database = await getDb();

//   return await database.getAllAsync<Product>(
//     `SELECT * FROM products WHERE price >= ? AND price <= ?`,
//     [min, max]
//   );
// };

// // --- Search full (name + price range) ---
// export const searchProductsAdvanced = async ({
//   keyword = "",
//   minPrice = 0,
//   maxPrice = Number.MAX_SAFE_INTEGER
// }: {
//   keyword?: string;
//   minPrice?: number;
//   maxPrice?: number;
// }): Promise<Product[]> => {
//   const database = await getDb();

//   const key = `%${keyword.toLowerCase()}%`;

//   return await database.getAllAsync<Product>(
//     `SELECT * FROM products
//      WHERE LOWER(name) LIKE ?
//      AND price >= ?
//      AND price <= ?`,
//     [key, minPrice, maxPrice]
//   );
// };


import * as SQLite from 'expo-sqlite';

// --- Database singleton ---
let db: SQLite.SQLiteDatabase | null = null;

export const getDb = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('myDatabase_3.db'); // DB mới
  }
  return db;
};

// --- Types ---
export type Category = { id: number; name: string };
export type Product = {
  id: number;
  name: string;
  price: number;
  img: string;
  categoryId: number;
  description?: string;
};
export type User = { id: number; username: string; password: string; role: 'admin' | 'user' };

// --- Dữ liệu mẫu ---
const initialCategories: Category[] = [
  { id: 1, name: 'Cà phê' },
  { id: 2, name: 'Trà sữa' },
  { id: 3, name: 'Trà hoa quả' },
  { id: 4, name: 'Sinh tố' },
  { id: 5, name: 'Nước ép' },
];

const initialProducts: Product[] = [
  { id: 1, name: 'Cà phê sữa đá', price: 30000, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU6UWI4h6QMr8rdfqmdTFuL8iDdst8VLDRlg&s', categoryId: 1, description: 'Cà phê pha phin + sữa đặc' },
  { id: 2, name: 'Cà phê đen', price: 25000, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU6UWI4h6QMr8rdfqmdTFuL8iDdst8VLDRlg&s', categoryId: 1 },
  { id: 3, name: 'Trà sữa trân châu', price: 45000, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU6UWI4h6QMr8rdfqmdTFuL8iDdst8VLDRlg&s', categoryId: 2, description: 'Trà sữa béo + trân châu dai' },
  { id: 4, name: 'Trà đào cam sả', price: 40000, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU6UWI4h6QMr8rdfqmdTFuL8iDdst8VLDRlg&s', categoryId: 3, description: 'Trà trái cây tươi mát' },
  { id: 5, name: 'Sinh tố bơ', price: 50000, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU6UWI4h6QMr8rdfqmdTFuL8iDdst8VLDRlg&s', categoryId: 4, description: 'Sinh tố bơ tươi + sữa' },
  { id: 6, name: 'Nước ép cam', price: 35000, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU6UWI4h6QMr8rdfqmdTFuL8iDdst8VLDRlg&s', categoryId: 5, description: 'Nước ép cam tươi nguyên chất' },
];

const initialUsers: User[] = [
  { id: 1, username: 'admin', password: '123456', role: 'admin' },
];

// --- Khởi tạo database ---
export const initDatabase = async (onSuccess?: () => void) => {
  try {
    const database = await getDb();

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY,
        name TEXT
      );
    `);

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY,
        name TEXT,
        price REAL,
        img TEXT,
        categoryId INTEGER,
        description TEXT,
        FOREIGN KEY (categoryId) REFERENCES categories(id)
      );
    `);

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        role TEXT
      );
    `);

    // Insert initial data
    for (const category of initialCategories) {
      await database.runAsync(
        'INSERT OR REPLACE INTO categories (id, name) VALUES (?, ?)',
        [category.id, category.name]
      );
    }

    for (const product of initialProducts) {
      await database.runAsync(
        'INSERT OR REPLACE INTO products (id, name, price, img, categoryId, description) VALUES (?, ?, ?, ?, ?, ?)',
        [product.id, product.name, product.price, product.img, product.categoryId, product.description || null]
      );
    }

    for (const user of initialUsers) {
      await database.runAsync(
        'INSERT OR IGNORE INTO users (id, username, password, role) VALUES (?, ?, ?, ?)',
        [user.id, user.username, user.password, user.role]
      );
    }

    console.log('✅ Database initialized');
    onSuccess && onSuccess();
  } catch (error) {
    console.error('❌ initDatabase error:', error);
  }
};

// ===============================
// BASIC CRUD
// ===============================

// --- Categories ---
export const fetchCategories = async (): Promise<Category[]> => {
  const database = await getDb();
  return await database.getAllAsync<Category>('SELECT * FROM categories');
};

export const getCategoryById = async (id: number): Promise<Category | null> => {
  const db = await getDb();
  const row = await db.getFirstAsync<Category>("SELECT * FROM categories WHERE id = ?", [id]);
  return row ?? null;
};

// --- Products ---
export const fetchProducts = async (): Promise<Product[]> => {
  const database = await getDb();
  return await database.getAllAsync<Product>('SELECT * FROM products');
};

export const getProductById = async (id: number): Promise<Product | null> => {
  const db = await getDb();
  const row = await db.getFirstAsync<Product>("SELECT * FROM products WHERE id = ?", [id]);
  return row ?? null;
};

// --- Users ---
export const fetchUsers = async (): Promise<User[]> => {
  const database = await getDb();
  return await database.getAllAsync<User>('SELECT * FROM users');
};

export const getUserById = async (id: number): Promise<User | null> => {
  const db = await getDb();
  const row = await db.getFirstAsync<User>("SELECT * FROM users WHERE id = ?", [id]);
  return row ?? null;
};

// ===============================
// ADMIN CRUD FUNCTIONS
// ===============================

// --- Category ---
export const addCategory = async (name: string): Promise<boolean> => {
  try {
    const db = await getDb();
    await db.runAsync("INSERT INTO categories (name) VALUES (?)", [name]);
    return true;
  } catch (err) {
    console.log("❌ addCategory error:", err);
    return false;
  }
};

export const updateCategory = async (id: number, name: string): Promise<boolean> => {
  try {
    const db = await getDb();
    await db.runAsync("UPDATE categories SET name = ? WHERE id = ?", [name, id]);
    return true;
  } catch (err) {
    console.log("❌ updateCategory error:", err);
    return false;
  }
};

export const deleteCategory = async (id: number): Promise<boolean> => {
  try {
    const db = await getDb();
    await db.runAsync("DELETE FROM categories WHERE id = ?", [id]);
    return true;
  } catch (err) {
    console.log("❌ deleteCategory error:", err);
    return false;
  }
};

// --- Product ---
export const addProduct = async (product: Omit<Product, "id">): Promise<boolean> => {
  try {
    const db = await getDb();
    await db.runAsync(
      `INSERT INTO products (name, price, img, categoryId, description)
       VALUES (?, ?, ?, ?, ?)`,
      [product.name, product.price, product.img, product.categoryId, product.description ?? null]
    );
    return true;
  } catch (err) {
    console.log("❌ addProduct error:", err);
    return false;
  }
};

export const updateProduct = async (product: Product): Promise<boolean> => {
  try {
    const db = await getDb();
    await db.runAsync(
      `UPDATE products
       SET name = ?, price = ?, img = ?, categoryId = ?, description = ?
       WHERE id = ?`,
      [product.name, product.price, product.img, product.categoryId, product.description ?? null, product.id]
    );
    return true;
  } catch (err) {
    console.log("❌ updateProduct error:", err);
    return false;
  }
};

export const deleteProduct = async (id: number): Promise<boolean> => {
  try {
    const db = await getDb();
    await db.runAsync("DELETE FROM products WHERE id = ?", [id]);
    return true;
  } catch (err) {
    console.log("❌ deleteProduct error:", err);
    return false;
  }
};

// --- User ---
export const adminAddUser = async (username: string, password: string, role: 'admin' | 'user'): Promise<boolean> => {
  try {
    const db = await getDb();
    await db.runAsync("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", [username, password, role]);
    return true;
  } catch (err) {
    console.log("❌ adminAddUser error:", err);
    return false;
  }
};

export const updateUser = async (id: number, data: { username?: string; password?: string; role?: 'admin' | 'user' }): Promise<boolean> => {
  try {
    const db = await getDb();
    const { username, password, role } = data;
    await db.runAsync(
      `UPDATE users SET username = COALESCE(?, username), password = COALESCE(?, password), role = COALESCE(?, role) WHERE id = ?`,
      [username ?? null, password ?? null, role ?? null, id]
    );
    return true;
  } catch (err) {
    console.log("❌ updateUser error:", err);
    return false;
  }
};

export const deleteUser = async (id: number): Promise<boolean> => {
  try {
    const db = await getDb();
    await db.runAsync("DELETE FROM users WHERE id = ?", [id]);
    return true;
  } catch (err) {
    console.log("❌ deleteUser error:", err);
    return false;
  }
};

export const changeUserRole = async (id: number, role: 'admin' | 'user'): Promise<boolean> => {
  try {
    const db = await getDb();
    await db.runAsync("UPDATE users SET role = ? WHERE id = ?", [role, id]);
    return true;
  } catch (err) {
    console.log("❌ changeUserRole error:", err);
    return false;
  }
};

export const changeUserPassword = async (id: number, newPassword: string): Promise<boolean> => {
  try {
    const db = await getDb();
    await db.runAsync("UPDATE users SET password = ? WHERE id = ?", [newPassword, id]);
    return true;
  } catch (err) {
    console.log("❌ changeUserPassword error:", err);
    return false;
  }
};

// ===============================
// SEARCH FUNCTIONS
// ===============================

// Products
export const searchProductsByName = async (keyword: string): Promise<Product[]> => {
  const db = await getDb();
  const key = `%${keyword.toLowerCase()}%`;
  return await db.getAllAsync<Product>("SELECT * FROM products WHERE LOWER(name) LIKE ?", [key]);
};

export const searchProductsByPriceRange = async (min: number, max: number): Promise<Product[]> => {
  const db = await getDb();
  return await db.getAllAsync<Product>("SELECT * FROM products WHERE price >= ? AND price <= ?", [min, max]);
};

export const searchProductsAdvanced = async ({ keyword = "", minPrice = 0, maxPrice = Number.MAX_SAFE_INTEGER }: { keyword?: string; minPrice?: number; maxPrice?: number }): Promise<Product[]> => {
  const db = await getDb();
  const key = `%${keyword.toLowerCase()}%`;
  return await db.getAllAsync<Product>(
    "SELECT * FROM products WHERE LOWER(name) LIKE ? AND price >= ? AND price <= ?",
    [key, minPrice, maxPrice]
  );
};

// Users
export const searchUsers = async (keyword: string): Promise<User[]> => {
  const db = await getDb();
  const key = `%${keyword.toLowerCase()}%`;
  return await db.getAllAsync<User>("SELECT * FROM users WHERE LOWER(username) LIKE ?", [key]);
};

// Categories
export const searchCategories = async (keyword: string): Promise<Category[]> => {
  const db = await getDb();
  const key = `%${keyword.toLowerCase()}%`;
  return await db.getAllAsync<Category>("SELECT * FROM categories WHERE LOWER(name) LIKE ?", [key]);
};
export const registerUser = async (username: string, password: string): Promise<boolean> => {
  try {
    const database = await getDb();

    const existing = await database.getFirstAsync<User>(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    if (existing) return false;

    await database.runAsync(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, password, 'user']
    );

    return true;
  } catch (error) {
    console.error('❌ registerUser error:', error);
    return false;
  }
};

// --- Lấy user theo credentials (Login) ---
export const getUserByCredentials = async (username: string, password: string): Promise<User | null> => {
  const database = await getDb();
  const user = await database.getFirstAsync<User>(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password]
  );
  return user ?? null;
};


// ===============================
// CART & ORDER LOGIC
// ===============================

// Cart item
export type CartItem = {
  id: number;
  productId: number;
  quantity: number;
  userId: number;
};

// Order
export type Order = {
  id?: number;
  userId: number;
  productId: number;
  quantity: number;
  totalPrice: number;
  createdAt: string;
};

// --- Khởi tạo bảng Cart & Orders ---
export const initCartAndOrders = async () => {
  const db = await getDb();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      productId INTEGER,
      quantity INTEGER,
      userId INTEGER,
      FOREIGN KEY (productId) REFERENCES products(id),
      FOREIGN KEY (userId) REFERENCES users(id)
    );
  `);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      productId INTEGER,
      quantity INTEGER,
      totalPrice REAL,
      createdAt TEXT,
      FOREIGN KEY (productId) REFERENCES products(id),
      FOREIGN KEY (userId) REFERENCES users(id)
    );
  `);
};

// --- CART CRUD ---
export const addToCart = async (userId: number, productId: number, quantity: number = 1): Promise<boolean> => {
  try {
    const db = await getDb();
    const existing = await db.getFirstAsync<CartItem>(
      'SELECT * FROM cart WHERE userId = ? AND productId = ?',
      [userId, productId]
    );

    if (existing) {
      await db.runAsync('UPDATE cart SET quantity = quantity + ? WHERE id = ?', [quantity, existing.id]);
    } else {
      await db.runAsync('INSERT INTO cart (userId, productId, quantity) VALUES (?, ?, ?)', [userId, productId, quantity]);
    }
    return true;
  } catch (error) {
    console.log('addToCart error:', error);
    return false;
  }
};


export const getCartByUser = async (userId: number): Promise<CartItem[]> => {
  const db = await getDb();
  return await db.getAllAsync<CartItem>('SELECT * FROM cart WHERE userId = ?', [userId]);
};

export const clearCart = async (userId: number) => {
  const db = await getDb();
  await db.runAsync('DELETE FROM cart WHERE userId = ?', [userId]);
};

// --- ORDER CRUD ---
export const placeOrder = async (userId: number): Promise<boolean> => {
  try {
    const db = await getDb();
    const cartItems = await getCartByUser(userId);

    for (const item of cartItems) {
      const product = await getProductById(item.productId);
      if (!product) continue;

      const totalPrice = product.price * item.quantity;
      const now = new Date().toISOString();

      await db.runAsync(
        'INSERT INTO orders (userId, productId, quantity, totalPrice, createdAt) VALUES (?, ?, ?, ?, ?)',
        [userId, item.productId, item.quantity, totalPrice, now]
      );
    }

    await clearCart(userId);
    return true;
  } catch (error) {
    console.log('placeOrder error:', error);
    return false;
  }
};

// --- Lấy lịch sử đơn hàng ---
export const getOrdersByUser = async (userId: number): Promise<Order[]> => {
  const db = await getDb();
  return await db.getAllAsync<Order>('SELECT * FROM orders WHERE userId = ?', [userId]);
};


// --- Xóa 1 sản phẩm khỏi giỏ hàng ---
export const removeFromCart = async (userId: number, productId: number): Promise<boolean> => {
  try {
    const db = await getDb();
    await db.runAsync('DELETE FROM cart WHERE userId = ? AND productId = ?', [userId, productId]);
    return true;
  } catch (error) {
    console.log('removeFromCart error:', error);
    return false;
  }
};



export const getCartItemsByUserId = async (userId: number) => {
  return new Promise<CartItemWithProduct[]>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT cart.id, cart.quantity, cart.productId,
                products.name, products.price, products.image
         FROM cart
         JOIN products ON products.id = cart.productId
         WHERE cart.userId = ?`,
        [userId],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      );
    });
  });
};



export type CartItemWithProduct = {
  id: number;
  quantity: number;
  productId: number;
  name: string;
  price: number;
  image: string;
};
