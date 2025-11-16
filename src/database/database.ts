// import Expo SQLite  
import * as SQLite from 'expo-sqlite';

// --- Mở database (API mới, async) ---
let db: SQLite.SQLiteDatabase | null = null;

export const getDb = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('myDatabase.db');
  }
  return db;
};

// --- TypeScript types ---
export type Category = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  img: string;
  categoryId: number;
};

export type User = {
  id: number;
  username: string;
  password: string;
  role: string;
};

// --- Dữ liệu mẫu ---
const initialCategories: Category[] = [
  { id: 1, name: 'Áo' },
  { id: 2, name: 'Giày' },
  { id: 3, name: 'Balo' },
  { id: 4, name: 'Mũ' },
  { id: 5, name: 'Túi' },
];

const initialProducts: Product[] = [
  { id: 1, name: 'Bánh gạo', price: 250000, img: 'hinh1.jpg', categoryId: 1 },
  { id: 2, name: 'Kẹo Oxi', price: 1100000, img: 'hinh1.jpg', categoryId: 2 },
  { id: 3, name: 'Bánh Mandu', price: 490000, img: 'hinh1.jpg', categoryId: 3 },
  { id: 4, name: 'Cơm nắm', price: 120000, img: 'hinh1.jpg', categoryId: 4 },
  { id: 5, name: 'Kem cá', price: 980000, img: 'hinh1.jpg', categoryId: 5 },
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

      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY,
        name TEXT,
        price REAL,
        img TEXT,
        categoryId INTEGER,
        FOREIGN KEY (categoryId) REFERENCES categories(id)
      );

      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        role TEXT
      );
    `);

    // Thêm dữ liệu mẫu
    for (const category of initialCategories) {
      await database.runAsync(
        'INSERT OR IGNORE INTO categories (id, name) VALUES (?, ?)',
        [category.id, category.name]
      );
    }

    for (const product of initialProducts) {
      await database.runAsync(
        'INSERT OR IGNORE INTO products (id, name, price, img, categoryId) VALUES (?, ?, ?, ?, ?)',
        [product.id, product.name, product.price, product.img, product.categoryId]
      );
    }

    // Thêm admin mặc định
    await database.runAsync(`
      INSERT INTO users (username, password, role)
      SELECT 'admin', '123456', 'admin'
      WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'admin');
    `);

    console.log('✅ Database initialized');
    onSuccess && onSuccess();
  } catch (error) {
    console.error('❌ initDatabase error:', error);
  }
};

// --- CRUD Categories ---
export const fetchCategories = async (): Promise<Category[]> => {
  const database = await getDb();
  return await database.getAllAsync<Category>('SELECT * FROM categories');
};

// --- CRUD Products ---
export const fetchProducts = async (): Promise<Product[]> => {
  const database = await getDb();
  return await database.getAllAsync<Product>('SELECT * FROM products');
};

export const addProduct = async (product: Omit<Product, 'id'>) => {
  const database = await getDb();
  await database.runAsync(
    'INSERT INTO products (name, price, img, categoryId) VALUES (?, ?, ?, ?)',
    [product.name, product.price, product.img, product.categoryId]
  );
  console.log('✅ Product added');
};

export const updateProduct = async (product: Product) => {
  const database = await getDb();
  await database.runAsync(
    'UPDATE products SET name = ?, price = ?, img = ?, categoryId = ? WHERE id = ?',
    [product.name, product.price, product.img, product.categoryId, product.id]
  );
  console.log('✅ Product updated');
};

export const deleteProduct = async (id: number) => {
  const database = await getDb();
  await database.runAsync('DELETE FROM products WHERE id = ?', [id]);
  console.log('✅ Product deleted');
};

export const fetchProductsByCategory = async (categoryId: number): Promise<Product[]> => {
  const database = await getDb();
  return await database.getAllAsync<Product>(
    'SELECT * FROM products WHERE categoryId = ?',
    [categoryId]
  );
};

// --- FIX LỖI QUAN TRỌNG TẠI ĐÂY ---
export const searchProductsByNameOrCategory = async (keyword: string): Promise<Product[]> => {
  const database = await getDb();
  const like = `%${keyword}%`;

  return await database.getAllAsync<Product>(
    `SELECT products.* 
     FROM products
     JOIN categories ON products.categoryId = categories.id
     WHERE products.name LIKE ? OR categories.name LIKE ?`,
    [like, like]
  );
};

// --- CRUD Users ---
export const addUser = async (username: string, password: string, role: string): Promise<boolean> => {
  try {
    const database = await getDb();
    await database.runAsync(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, password, role]
    );
    console.log('✅ User added');
    return true;
  } catch (error) {
    console.error('❌ Error adding user:', error);
    return false;
  }
};

export const updateUser = async (user: User) => {
  const database = await getDb();
  await database.runAsync(
    'UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?',
    [user.username, user.password, user.role, user.id]
  );
  console.log('✅ User updated');
};

export const deleteUser = async (id: number) => {
  const database = await getDb();
  await database.runAsync('DELETE FROM users WHERE id = ?', [id]);
  console.log('✅ User deleted');
};

export const fetchUsers = async (): Promise<User[]> => {
  const database = await getDb();
  return await database.getAllAsync<User>('SELECT * FROM users');
};

export const getUserByCredentials = async (username: string, password: string): Promise<User | null> => {
  const database = await getDb();
  const user = await database.getFirstAsync<User>(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password]
  );
  return user ?? null;
};

export const getUserById = async (id: number): Promise<User | null> => {
  const database = await getDb();
  const user = await database.getFirstAsync<User>(
    'SELECT * FROM users WHERE id = ?',
    [id]
  );
  return user ?? null;
};
