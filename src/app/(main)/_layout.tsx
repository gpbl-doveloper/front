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
        <Tabs.Screen name="(diary)" options={{ title: "Diary" }} />
        <Tabs.Screen
          name="(teacher-home)"
          options={{ title: "Teacher's Home" }}
        />
        {/* <Tabs.Screen name="reservation" options={{ title: "Reservation" }} /> */}
        {/* <Tabs.Screen name="chat" options={{ title: "Chat" }} /> */}
        {/* <Tabs.Screen name="settings" options={{ title: "Settings" }} /> */}
      </Tabs>
    </View>
  );
}
