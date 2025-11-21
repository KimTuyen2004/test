// src/database/database.ts
import * as SQLite from 'expo-sqlite';
import { SQLiteDatabase } from 'expo-sqlite';

// --- Mở database ---
let db: SQLiteDatabase | null = null;

export const getDb = async (): Promise<SQLiteDatabase> => {
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
  id?: number;
  name: string;
  price: number;
  img: string;
  categoryId: number;
  description?: string;
};

export type User = {
  id?: number;
  username: string;
  password: string;
  role: 'admin' | 'user';
};

// --- Dữ liệu mẫu ---
const initialCategories: Category[] = [
  { id: 1, name: 'Cà phê' },
  { id: 2, name: 'Trà sữa' },
  { id: 3, name: 'Trà hoa quả' },
  { id: 4, name: 'Sinh tố' },
  { id: 5, name: 'Nước ép' },
];

const initialProducts: Product[] = [
  { name: 'Cà phê sữa đá', price: 30000, img: 'https://i.imgur.com/2nCt3Sb.png', categoryId: 1, description: 'Cà phê pha phin + sữa đặc' },
  { name: 'Cà phê đen', price: 25000, img: 'https://i.imgur.com/DvpvklR.png', categoryId: 1, description: 'Cà phê đen nguyên chất' },
  { name: 'Trà sữa trân châu', price: 45000, img: 'https://i.imgur.com/1bX5QH6.png', categoryId: 2, description: 'Trà sữa béo + trân châu dai' },
  { name: 'Trà đào cam sả', price: 40000, img: 'https://i.imgur.com/2nCt3Sb.png', categoryId: 3, description: 'Trà trái cây tươi mát' },
  { name: 'Sinh tố bơ', price: 50000, img: 'https://i.imgur.com/DvpvklR.png', categoryId: 4, description: 'Sinh tố bơ tươi + sữa' },
  { name: 'Nước ép cam', price: 35000, img: 'https://i.imgur.com/1bX5QH6.png', categoryId: 5, description: 'Nước ép cam tươi nguyên chất' },
];

const initialUsers: User[] = [
  { username: 'admin', password: '123456', role: 'admin' },
  { username: 'user01', password: '123456', role: 'user' },
];

// --- Khởi tạo database ---
export const initDatabase = async () => {
  try {
    const database = await getDb();

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
      );

      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price REAL,
        img TEXT,
        categoryId INTEGER,
        description TEXT,
        FOREIGN KEY (categoryId) REFERENCES categories(id)
      );

      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        role TEXT
      );
    `);

    // Chèn dữ liệu mẫu
    for (const cat of initialCategories) {
      await database.runAsync(
        'INSERT OR IGNORE INTO categories (id, name) VALUES (?, ?)',
        [cat.id, cat.name]
      );
    }

    for (const p of initialProducts) {
      await database.runAsync(
        'INSERT OR IGNORE INTO products (name, price, img, categoryId, description) VALUES (?, ?, ?, ?, ?)',
        [p.name, p.price, p.img, p.categoryId, p.description]
      );
    }

    for (const u of initialUsers) {
      await database.runAsync(
        `INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)`,
        [u.username, u.password, u.role]
      );
    }

    console.log('✅ Database initialized');
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

export const fetchProductsByCategory = async (categoryId: number): Promise<Product[]> => {
  const database = await getDb();
  return await database.getAllAsync<Product>('SELECT * FROM products WHERE categoryId = ?', [categoryId]);
};

export const searchProductsByNameOrCategory = async (keyword: string): Promise<Product[]> => {
  const database = await getDb();
  const like = `%${keyword}%`;
  return await database.getAllAsync<Product>(
    `SELECT products.* FROM products
     JOIN categories ON products.categoryId = categories.id
     WHERE products.name LIKE ? OR categories.name LIKE ?`,
    [like, like]
  );
};

export const addProduct = async (product: Omit<Product, 'id'>) => {
  const database = await getDb();
  await database.runAsync(
    'INSERT INTO products (name, price, img, categoryId, description) VALUES (?, ?, ?, ?, ?)',
    [product.name, product.price, product.img, product.categoryId, product.description]
  );
};

export const updateProduct = async (product: Product) => {
  const database = await getDb();
  await database.runAsync(
    'UPDATE products SET name = ?, price = ?, img = ?, categoryId = ?, description = ? WHERE id = ?',
    [product.name, product.price, product.img, product.categoryId, product.description, product.id]
  );
};

export const deleteProduct = async (id: number) => {
  const database = await getDb();
  await database.runAsync('DELETE FROM products WHERE id = ?', [id]);
};

// --- CRUD Users ---
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

export const addUser = async (user: Omit<User, 'id'>) => {
  const database = await getDb();
  await database.runAsync(
    'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
    [user.username, user.password, user.role]
  );
};

export const updateUser = async (user: User) => {
  const database = await getDb();
  await database.runAsync(
    'UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?',
    [user.username, user.password, user.role, user.id]
  );
};

export const deleteUser = async (id: number)
