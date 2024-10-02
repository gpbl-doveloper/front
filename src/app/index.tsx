// index.tsx
// 메인 페이지
import React from "react";
import { View, Text, Button } from "react-native";
import { Link, useRouter } from "expo-router";

export default function MainScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center p-4">
      {/* 기본 로고 등 */}
      <Text className="text-2xl mb-5">DogDog!</Text>

      <Link href="/(auth)/login" className="text-lg text-blue-600"> Go to Login </Link>
      <Link href="/(main)/home" className="mt-6">
        {" "}
        Go to Main{" "}
      </Link>
    </View>
  );
}
