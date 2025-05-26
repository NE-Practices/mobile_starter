import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface DropdownMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function DropdownMenu({ onEdit, onDelete }: DropdownMenuProps) {
  const [visible, setVisible] = useState(false);

  return (
    <View className="">
      <TouchableOpacity onPress={() => setVisible((v) => !v)}>
        <MaterialCommunityIcons name="dots-vertical" size={24} />
      </TouchableOpacity>

      {visible && (
        <View className="absolute top-7 right-0 bg-white rounded-md shadow-xl z-50 w-32" >
          <TouchableOpacity
            className="p-2 border-b border-gray-200"
            onPress={() => {
              setVisible(false);
              onEdit();
            }}
          >
            <Text className="text-gray-700">Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="p-2"
            onPress={() => {
              setVisible(false);
              onDelete();
            }}
          >
            <Text className="text-red-600">Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
