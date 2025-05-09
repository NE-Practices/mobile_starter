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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading product...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView  className="p-10 bg-white">
      <Image
        source={{ uri: product.image }}
        style={{ width: 256, height: 256, marginBottom: 16 }}
        resizeMode="contain"
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 8,
          textAlign: "center",
        }}
      >
        {product.title}
      </Text>
      <Text style={{ fontSize: 18, color: "#666", marginBottom: 16 }}>
        ${product.price}
      </Text>
      <Text style={{ fontSize: 16, textAlign: "center" }}>
        {product.description}
      </Text>
    </ScrollView>
  );
}
