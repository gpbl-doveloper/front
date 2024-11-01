// (main)/_layout.tsx
import React from "react";
import { Tabs, Stack } from "expo-router";
import { View } from "react-native";

export default function MainLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          // tabBarActiveTintColor: "#FCB3AD",
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="(home)"
          options={{
            title: "Home",
          }}
        />
        <Stack.Screen
          name="(teacher-home)"
          options={{ title: "Teacher's Home" }}
        />
      </Stack>
    </View>
  );
}
