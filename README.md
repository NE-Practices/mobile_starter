# 🚀 Mobile Starter 2025

A fast, modern mobile starter kit using **React Native + Mock APIs** — built to get you moving *fast* ⚡

---

## 🔧 Features

- 🔐 Simple **Authentication** using `AsyncStorage` (login, register, fetch profile)
- ⚙️ Full **CRUD support** for products with [mockapi.io](https://mockapi.io)
- 📱 **Mobile-first** UI design powered by Expo
- 🧪 Perfect for prototyping, testing, or bootstrapping your next mobile app

---

## 🧠 How It Works (Quick Overview)

### ✅ Login

```ts
await login("user01@gmail.com", "Test@123");
// Stores user and token in AsyncStorage
```

## Register

```ts
await register("New User", "email@example.com", "password123", "1234567890");
```

## 👤 Fetch Profile

## Product MockAPI CRUD

```ts
await getProducts();                      // Fetch all products
await getProductById(1);                  // Fetch product by ID
await createProduct({ name: "Sample" });  // Create new product
await updateProductById(1, { name: "Updated" }); // Update product
await deleteProductById(1);               // Delete product
```


## Getting Started

```
npm install
npx expo start

```
