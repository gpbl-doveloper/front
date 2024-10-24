import { StyleSheet } from "react-native";

export const joinStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
    },
    input: {
      width: "80%",
      padding: 8,
      borderColor: "gray",
      borderWidth: 1,
      marginBottom: 15,
      borderRadius: 8,
    },
    disabledInput: {
      backgroundColor: "#d3d3d3", // 비활성화 시 회색 배경색
    },
  });
  