// (main)/_layout.tsx
import React from "react";
import { SafeAreaView, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import DiaryLayout from "./(diary)/_layout";
import ReservationPage from "./(reservation)";
import ProfilePage from "../../(auth)/(profile)";

const Tab = createBottomTabNavigator();

export default function ParentsHomeLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => {
          const tabIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
            Home: "home-outline", // name 속성과 일치하도록 수정
            Reservation: "calendar-outline",
            Profile: "person-outline",
          };

          return {
            tabBarIcon: ({ color, size }) => {
              const iconName = tabIcons[route.name] ?? "home-outline";
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#4A3AFF",
            tabBarInactiveTintColor: "gray",
            headerShown: false,
          };
        }}
      >
        <Tab.Screen name="Home" component={DiaryLayout} />
        <Tab.Screen name="Reservation" component={ReservationPage} />
        <Tab.Screen name="Profile" component={ProfilePage} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
