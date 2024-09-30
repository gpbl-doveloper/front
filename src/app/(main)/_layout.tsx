// (main)/_layout.tsx
import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Stack } from "expo-router";

const Tab = createBottomTabNavigator();

export default function MainLayout() {
  return (
    <View style={{ flex: 1 }}>
      {/* 상단 헤더 영역 */}
      <View style={{ padding: 16, backgroundColor: "#4CAF50" }}>
        <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
          Main Layout Header
        </Text>
      </View>

      {/* 하단 탭 네비게이터 */}
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#42f44b",
          tabBarInactiveTintColor: "gray",
          headerShown: false, // 개별 페이지에 헤더를 표시하지 않음
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </View>
  );
}

// 각각의 페이지를 위한 예시 컴포넌트
function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-xl">Home Page</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-xl">Profile Page</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-xl">Settings Page</Text>
    </View>
  );
}
