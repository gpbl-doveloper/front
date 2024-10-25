import { router } from "expo-router";

export const navigationController = {
  goToJoin: () => router.push("/(auth)/(join)"),
  goToFindPassword: () => router.push("/(auth)/(join)"),
  goToSignIn: () => router.push("/(auth)/(login)"),
};
