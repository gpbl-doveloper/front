import React from "react";
import { Stack } from "expo-router/stack";

export default function TeacherHomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="search" options={{ title: "Search" }} />
      <Stack.Screen name="(dog-detail)/index" options={{ title: "Detail" }} />
    </Stack>
  );
}
