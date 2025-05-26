import React, { useState } from "react";
import { View, TextInput, TextInputProps, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CustomInputProps extends TextInputProps {
  icon: React.ReactNode;
  isPassword?: boolean;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  icon,
  isPassword = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="flex-row items-center border border-gray-300 rounded-lg px-3 mb-4 bg-white">
      <View className="mr-2">{icon}</View>
      <TextInput
        className="flex-1 text-lg"
        secureTextEntry={isPassword && !showPassword}
        placeholderTextColor="#888"
        {...props}
      />
      {isPassword && (
        <Pressable onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color="#888"
          />
        </Pressable>
      )}
    </View>
  );
};
