import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  Alert,
  ScrollView,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import {
  createProduct,
  updateProductById,
} from "../../services/product.service";
import { useRouter } from "expo-router";

const ProductForm = ({
  type,
  product,
}: {
  type: "create" | "edit";
  product?: any;
}) => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (type === "edit" && product) {
      setTitle(product.title || "");
      setPrice(product.price?.toString() || "");
      setDescription(product.description || "");
      setImage(product.image || "");
    } else {
      setTitle("");
      setPrice("");
      setDescription("");
      setImage("");
    }
  }, [type, product]);

  const handleSubmit = async () => {
    if (!title || !price || !description || !image) {
      return Alert.alert("Missing Fields", "Please fill in all fields.");
    }

    const payload = {
      title,
      price: parseFloat(price),
      description,
      image,
    };

    try {
      setLoading(true);
      if (type === "edit" && product?.id) {
        await updateProductById(product.id, payload);
        Alert.alert("Success", "Product updated.");
      } else {
        const result = await createProduct(payload);
        Alert.alert("Success", `Product created with ID: ${result.id}`);
        setTitle("");
        setPrice("");
        setDescription("");
        setImage("");
      }
      router.back();
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to save product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      className="p-10 bg-white flex-1"
    >
      <Text className="text-3xl font-bold text-[#114775] text-center mb-8">
        {type === "edit" ? "Edit Product" : "Create Product"}
      </Text>

      <View className="space-y-4">
        <View>
          <Text className="text-base font-semibold mb-1">Title</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Enter product title"
            className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
          />
        </View>

        <View>
          <Text className="text-base font-semibold mb-1">Price</Text>
          <TextInput
            value={price}
            onChangeText={setPrice}
            placeholder="Enter price"
            keyboardType="decimal-pad"
            className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
          />
        </View>

        <View>
          <Text className="text-base font-semibold mb-1">Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description"
            multiline
            numberOfLines={4}
            className="border border-gray-300 rounded-lg px-4 py-3 bg-white text-base"
          />
        </View>

        <View>
          <Text className="text-base font-semibold mb-1">Image URL</Text>
          <TextInput
            value={image}
            onChangeText={setImage}
            placeholder="Enter image URL"
            className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
          />
        </View>

        <Pressable
          onPress={handleSubmit}
          className={`mt-6 rounded-lg bg-[#114775] py-3 ${
            loading ? "opacity-60" : "opacity-100"
          }`}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-center text-lg font-medium">
              {type === "edit" ? "Update Product" : "Create Product"}
            </Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default ProductForm;
