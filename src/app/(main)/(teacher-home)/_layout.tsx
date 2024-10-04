// (main)/_layout.tsx
import React from "react";
import { Tabs, Stack } from "expo-router";
import { View } from "react-native";

export default function MainLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="teacher-home" // 경로 명 지정
        />
        <Stack.Screen name="photo" />
      </Stack>
    </View>
  );
}
