// (main)/_layout.tsx
import React from "react";
import { Tabs, Stack } from "expo-router";
import { View } from "react-native";

export default function MainLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FCB3AD",
          headerShown: true,
        }}
      >
        <Tabs.Screen name="(home)" options={{ title: "Home" }} />
        <Tabs.Screen
          name="(teacher-home)"
          options={{ title: "Teacher's Home" }}
        />
      </Tabs>
    </View>
  );
}
