// (main)/_layout.tsx
import React from "react";
import { SafeAreaView } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import DiaryLayout from "./(diary)/_layout";
import ProfilePage from "../../(auth)/(profile)";
import ReservationLayout from "./(reservation)/_layout";

const Tab = createBottomTabNavigator();

export default function ParentsHomeLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF7E9" }}>
      <Tab.Navigator
        screenOptions={({ route }) => {
          const tabIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
            Home: "home-outline",
            Reservation: "calendar-outline",
            Profile: "person-outline",
          };

          return {
            tabBarIcon: ({ color, size }) => {
              const iconName = tabIcons[route.name] ?? "home-outline";
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#FEDDCC",
            tabBarInactiveTintColor: "gray",
            headerShown: false,
            tabBarStyle: {
              backgroundColor: "#55382A",
            },
          };
        }}
      >
        <Tab.Screen name="Home" component={DiaryLayout} />
        <Tab.Screen name="Reservation" component={ReservationLayout} />
        <Tab.Screen name="Profile" component={ProfilePage} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
