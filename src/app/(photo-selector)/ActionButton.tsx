import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

interface ActionButtonProps {
  text: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function ActionButton({
  text,
  onPress,
  style,
  textStyle,
}: ActionButtonProps) {
  return (
    <TouchableOpacity style={[styles.baseButton, style]} onPress={onPress}>
      <Text style={[styles.baseButtonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    padding: 10,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    width: "40%",
    height: 50,
  },
  baseButtonText: {
    fontSize: 16,
  },
});
