// (teacher-home)/_layout.tsx
import React from "react";
import { Stack } from "expo-router";

export default function DogDetailLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Detail" }} />
      <Stack.Screen name="(dog-note)/index" options={{ title: "Note" }} />
    </Stack>
  );
}
