import React from "react";
import { Platform } from "react-native";
import { Tabs } from "expo-router";

import { HapticTab } from "../../components/HapticTab";
import { IconSymbol } from "../../components/ui/IconSymbol";
import TabBarBackground from "../../components/ui/TabBarBackground";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "../../hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? "light"].tint;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: tintColor,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: "transparent",
          position: Platform.OS === "ios" ? "absolute" : "relative",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="products"
        options={{
          title: "Products",
          tabBarIcon: ({ color }) => (
            <IconSymbol name="bag.fill" size={26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="addProduct"
        options={{
          title: "Add",
          tabBarIcon: ({ color }) => (
            <IconSymbol name="add" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol name="person" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
