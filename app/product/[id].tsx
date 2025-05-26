import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getProductById } from "../../services/product.service";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const data = await getProductById(Number(id));
          setProduct(data);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#114775" />
        <Text className="mt-4 text-gray-600 text-base">Loading product...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-lg font-semibold text-gray-700">
          Product not found.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <View className="items-center mb-6">
        <Image
          source={{ uri: product.image }}
          className="w-64 h-64 rounded-lg"
          resizeMode="contain"
        />
      </View>

      <Text className="text-2xl font-bold text-center text-[#114775] mb-2">
        {product.title}
      </Text>

      <Text className="text-xl text-gray-600 text-center mb-4">
        ${product.price}
      </Text>

      <Text className="text-base text-gray-700 text-center leading-relaxed">
        {product.description}
      </Text>
    </ScrollView>
  );
}
