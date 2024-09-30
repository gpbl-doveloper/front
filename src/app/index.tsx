// index.tsx
import React from "react";
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function MainScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-2xl mb-5">Welcome Said!</Text>
      <Button
        title="Go to Login"
        onPress={() => router.push("/(auth)/login")}
        color="#4CAF50"
      />
      <Button
        title="Go to Main"
        onPress={() => router.push("/(main)/main")}
        color="#4CAF50"
      />
    </View>
  );
}
