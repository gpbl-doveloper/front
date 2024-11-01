import { router } from "expo-router";

export const navigationController = {
  goToLogin: () => router.push("/(auth)/(login)"),
  goToJoin: () => router.push("/(auth)/(join)"),
  goToTest: () => router.push("/(main)/(teacher-home)"),
};
