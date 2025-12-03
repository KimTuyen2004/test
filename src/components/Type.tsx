// export type Product = {
//   id: number;
//   name: string;
//   category: string;
//   price: number;
//   image?: string;
//   description?: string;
// };



// ../components/Type.ts

// --- User ---
export interface User {
  id: number;        // ID trong database
  username: string;  // tên hiển thị
  email: string;
  password?: string; // tùy chọn nếu lưu password (không nên lưu plain text)
}

// --- Product ---
export interface Product {
  id: number;          // ID trong database
  name: string;
  category: string;
  price: number;
  image: string;       // URL hoặc local path
  description?: string;
}

// --- Cart Item ---
export interface CartItem {
  id: number;         // ID trong database cart table
  userId: number;
  productId: number;
  quantity: number;
  // product?: Product; // có thể dùng khi join với Product
}

// --- Order ---
export interface Order {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  totalPrice: number;
  createdAt: string;
  // product?: Product; // tùy chỉnh nếu muốn join
}
