import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { OpaqueColorValue, StyleProp, TextStyle } from "react-native";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

const MAPPING: Record<string, IoniconName> = {
  "house.fill": "home",
  "paperplane.fill": "send",
  "bag.fill": "bag",
  "creditcard.fill": "card",
  person: "person",
  add:"add-circle"
};

export type IconSymbolName = keyof typeof MAPPING;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
}) {
  return (
    <Ionicons name={MAPPING[name]} size={size} color={color} style={style} />
  );
}
