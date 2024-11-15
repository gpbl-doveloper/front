import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ReservationScreen from "./(reservation)/index";
import TeacherHomePageLayout from "./(teacher-homepage)/_layout";
import ProfilePage from "../../(auth)/(profile)";

const Tab = createBottomTabNavigator();

export default function TeacherHomeLayout() {
  return (
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
      <Tab.Screen name="Home" component={TeacherHomePageLayout} />
      <Tab.Screen name="Reservation" component={ReservationScreen} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
}
