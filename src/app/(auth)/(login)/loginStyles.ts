import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },
  loginContent: {
    justifyContent: "center",
    flex: 1,
    padding: 10,
  },
  logoContainer: {
    marginBottom: 10,
    alignItems: "center",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
  },
  loginFormContainer: {
    gap: 16,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  loginOptionsContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
  },

  forgotPassword: {
    color: "#666",
    fontSize: 14,
    fontWeight: "600",
  },

  signUpContainer: {
    marginVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    color: "#666",
    fontSize: 14,
  },
  signUpLink: {
    color: "#6B4EFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
