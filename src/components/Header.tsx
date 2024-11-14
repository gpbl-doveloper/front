import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface HeaderButtonsProps {
  onCancel: () => void;
  onDone: () => void;
}

export function Header2Buttons({ onCancel, onDone }: HeaderButtonsProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onCancel}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDone}>
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cancelText: {
    fontSize: 16,
    color: "#000",
  },
  doneText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});
