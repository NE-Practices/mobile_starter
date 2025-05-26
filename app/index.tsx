import React from "react";
import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import "../global.css";

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={["#ffffff", "#e6f0f8"]}
      className="flex-1 justify-center items-center px-6"
    >
      <StatusBar barStyle="dark-content" />

      <Image
        source={require("../assets/images/imgs/logo2.png")}
        style={{ width: 180, height: 180, marginBottom: 30 }}
        resizeMode="contain"
      />

      <Text className="text-4xl font-bold text-[#114775] mb-4 text-center">
        Welcome to EcomJson
      </Text>

      <Text className="text-lg text-center text-gray-600 mb-10 px-2">
        Discover insights and manage your projects seamlessly.
      </Text>

      <View className="flex-row justify-center space-x-10 gap-3">
        <Link href="/(auth)/LoginScreen" asChild>
          <TouchableOpacity className="bg-[#114775] px-6 py-3 rounded-full shadow-md">
            <Text className="text-white font-semibold text-base">Login</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/(auth)/RegisterScreen" asChild>
          <TouchableOpacity className="bg-red-500 px-6 py-3 rounded-full shadow-md">
            <Text className="text-white font-semibold text-base">Register</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <Text className="text-sm text-gray-500 mt-10">
        Powered by EcomJson Technologies
      </Text>
    </LinearGradient>
  );
}
