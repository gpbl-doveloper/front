import { router } from "expo-router";

export const navigationController = {
  goToJoin: () => router.push("/(auth)/(join)"),
  goToFindPassword: () => router.push("/(auth)/(join)"),
};


