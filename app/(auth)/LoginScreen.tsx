import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { login } from "../../services/auth.service";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
      Alert.alert("Login Successful", "Logged in successfully");
      router.push("/(tabs)/products");
    } catch (error) {
      Alert.alert("Login Failed", (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Image
        source={require("../../assets/images/imgs/logo2.png")}
        style={{ width: 150, height: 150, marginBottom: 30 }}
        resizeMode="contain"
      />

      <Text className="text-3xl font-bold mb-6 text-[#114775]">
        Welcome Back
      </Text>

      <View className="w-full max-w-md">
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 mb-6 text-base"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Pressable
          className={`bg-[#114775] rounded-lg py-3 mb-4 ${
            loading ? "opacity-60" : "opacity-100"
          }`}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-center text-lg font-medium">
              Login
            </Text>
          )}
        </Pressable>

        <Text
          className="text-center text-[#114775] underline"
          onPress={() => router.push("/(auth)/RegisterScreen")}
        >
          Don&apos;t have an account? Register
        </Text>
      </View>
    </View>
  );
}
