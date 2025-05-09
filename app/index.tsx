import { View, Text, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import './../global.css'
export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Image
        source={require("../assets/images/imgs/logo2.png")}
        alt="logo"
        width={200}
        height={200}
      />
      <Text className="text-2xl font-bold mb-4">Welcome EcomJson</Text>
      <Text className="text-base text-center text-gray-600 mb-8">
        Get started by signing in or creating an account.
      </Text>
      <View className="flex-row space-x-4 gap-5">
        <Link href="/(auth)/LoginScreen" asChild>
          <TouchableOpacity className="bg-[#114775] px-6 py-3 rounded-lg">
            <Text className="text-white font-semibold">Login</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/(auth)/RegisterScreen" asChild>
          <TouchableOpacity className="bg-red-500 px-6 py-3 rounded-lg">
            <Text className="text-white font-semibold">Register</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
