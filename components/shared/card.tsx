import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { getCart } from '../../services/cart.service';

export default function CardScreen() {
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = 1; // Dummy userId

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart(userId);
        setCart(data);
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-600">Your cart is empty.</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: any }) => (
    <View className="bg-white rounded-lg p-4 mb-4 shadow">
      <Text className="font-bold text-lg mb-1">Cart ID: {item.id}</Text>
      <Text className="text-gray-700">User ID: {item.userId}</Text>
      <Text className="text-gray-700">Date: {item.date}</Text>
      <Text className="text-gray-700">Products:</Text>
      {item.products.map((product: any) => (
        <Text key={product.productId} className="ml-4 text-gray-600">
          Product ID: {product.productId}, Quantity: {product.quantity}
        </Text>
      ))}
    </View>
  );

  return (
    <FlatList
      className="p-4 bg-gray-100 flex-1"
      data={cart}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
}
