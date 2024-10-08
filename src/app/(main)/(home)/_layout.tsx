// (main)/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function MainLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" />
        <Stack.Screen name="(diary)" />
      </Stack>
    </View>
  );
}
