import "../../../global.css";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";

interface IconTextBtnProps {
  title: string;
  icon: string;
  onPress: () => void;
  className?: string;
}

export function IconTextBtn({ title, icon, onPress }: IconTextBtnProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.button}
    >
      <View style={styles.iconContainer}>
        <FontAwesome6 name={icon} size={24} color="black" />
      </View>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

interface IconBtnProps {
  icon: string;
  onPress: () => void;
}

export function IconBtn({ onPress, icon }: IconBtnProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.bigIconContainer}
    >
      <AntDesign name="medicinebox" size={32} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FCB3AD",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // 그림자 효과 (Android)
    width: "60%",
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  bigIconContainer: {
    width: 75,
    height: 75,
    borderRadius: 100,
    backgroundColor: "#FCB3AD",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // 그림자 효과 (Android)
  },
});
