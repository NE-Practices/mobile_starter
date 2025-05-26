import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { fetchUserProfile } from "../../services/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await fetchUserProfile();
        console.log("Fetched user data:", data);
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("token");
          router.replace("/(auth)/LoginScreen");
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-red-500">Failed to load user data.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-6 pt-12">
      <View className="items-center mb-8">
        <Image
          source={{ uri: user.profilePicture || "https://i.pravatar.cc/150?img=3" }}
          className="w-32 h-32 rounded-full mb-4"
          resizeMode="contain"
        />
        <Text className="text-2xl font-bold text-gray-800 mb-1">
          {user.name?.firstname ?? user.username} {user.name?.lastname ?? ""}
        </Text>
        <Text className="text-gray-500 text-base">{user.email}</Text>
        <Text className="text-gray-500 text-base">
          {user.phone || user.telephone}
        </Text>
      </View>

      {user.address && (
        <View className="bg-gray-100 p-4 rounded-lg space-y-2">
          <Text className="text-gray-700 font-semibold">Address</Text>
          <Text className="text-gray-600">
            {user.address.number} {user.address.street}
          </Text>
          <Text className="text-gray-600">
            {user.address.city}, {user.address.zipcode}
          </Text>
          <Text className="text-gray-600">
            Lat: {user.address.geolocation.lat} | Long:{" "}
            {user.address.geolocation.long}
          </Text>
        </View>
      )}

      <TouchableOpacity
        className="mt-10 bg-red-500 rounded-lg py-3 items-center"
        onPress={handleLogout}
      >
        <Text className="text-white font-semibold text-lg">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
