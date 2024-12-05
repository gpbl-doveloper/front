import { StyleSheet } from "react-native";

export const photoSelectorStyles = StyleSheet.create({
  selectCountText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 8,
    justifyContent: "space-between",
    backgroundColor: "#FFF7E9",
  },
  errorText: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    margin: 10,
  },
});
