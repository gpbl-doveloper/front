// (main)/_layout.tsx
import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Stack } from "expo-router";
import MainScreen from "./home";

const Tab = createBottomTabNavigator();

export default function MainLayout() {
  return (
    <View style={{ flex: 1 }}>
      {/* 하단 탭 네비게이터 */}
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#FCB3AD",
          tabBarInactiveTintColor: "gray",
          headerShown: true, // 개별 페이지에 헤더를 표시하지 않음
        }}
      >
        <Tab.Screen name="Home" component={MainScreen} />
        <Tab.Screen name="Reservation" component={ReservationScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Setting" component={SettingsScreen} />
      </Tab.Navigator>
    </View>
  );
}

function ReservationScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-xl">Reservation Page</Text>
    </View>
  );
}

function ChatScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-xl">Chatting Page</Text>
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
