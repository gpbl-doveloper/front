import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();
import TeacherHomeLayout from "./(teacher-homepage)/_layout";
import ReservationScreen from "./(reservation)/index";
import ProfilePage from "./(profile)/index";

export default function MainLayout() {
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
        <Tab.Screen name="Home" component={TeacherHomeLayout} />
        <Tab.Screen name="Reservation" component={ReservationScreen} />
        <Tab.Screen name="Profile" component={ProfilePage} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
