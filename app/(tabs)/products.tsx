/* eslint-disable react/display-name */
import React, { useEffect, useState, useCallback } from "react";
import {
  Alert,
  FlatList,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { deleteProductById, getProducts } from "../../services/product.service";
import DropdownMenu from "../../components/shared/dropDown";
import { useIsFocused } from "@react-navigation/native";

const ITEM_HEIGHT = 100;

const ProductItem = React.memo(({ item, onPress, onEdit, onDelete }: any) => {
  return (
    <View className="flex-row mb-4 bg-white rounded-lg shadow-md overflow-auto">
      <TouchableOpacity className="flex-1" onPress={onPress}>
        <View className="flex-row">
          <Image source={{ uri: item.image }} className="w-24 h-24" />
          <View className="flex-1 p-2 justify-center">
            <Text className="font-bold mb-1" numberOfLines={1}>
              {item.title}
            </Text>
            <Text className="text-gray-500">${item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <View className="absolute right-2 top-2">
        <DropdownMenu
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item)}
        />
      </View>
    </View>
  );
});

export default function ProductsScreen() {
  const [products, setProducts] = useState<
    { id: number; title: string; price: number; image: string }[]
  >([]);
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 Search query state
  const router = useRouter();
  const isFocused = useIsFocused();

  const handleDelete = async (item: any) => {
    Alert.alert(
      "Delete Product",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteProductById(item.id);
              setProducts((prev) => prev.filter((p) => p.id !== item.id));
            } catch (err) {
              Alert.alert("Error", "Failed to delete product.");
              console.log("Error deleting product:", err);
            }
          },
        },
      ]
    );
  };

  const handleEdit = (item: any) => {
    router.push({
      pathname: "/product/edit",
      params: { product: JSON.stringify(item) },
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    if (isFocused) {
      fetchProducts();
    }
  }, [isFocused]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = useCallback(
    ({ item }: any) => (
      <ProductItem
        item={item}
        onPress={() => router.push(`/product/${item.id}`)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    ),
    [router]
  );

  const getItemLayout = (_: any, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  return (
    <View className="p-4 bg-gray-100 flex-1">
      <Text className="font-bold text-lg py-2">Available products</Text>

      {/* Search Input */}
      <TextInput
        placeholder="Search by name..."
        className="bg-white px-4 py-4 mb-4 rounded-md border border-gray-300"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={[...filteredProducts].reverse()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        initialNumToRender={8}
        getItemLayout={getItemLayout}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={5}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-10">
            No products found.
          </Text>
        }
      />
    </View>
  );
}
