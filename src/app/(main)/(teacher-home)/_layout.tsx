import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

export default function MainLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => {
          const tabIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
            "(home)": "home-outline", // name 속성과 일치하도록 수정
            "(reservation)": "calendar-outline",
            "(profile)": "person-outline",
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
        <Tab.Screen
          name="(home)"
          options={{ tabBarLabel: "Home" }}
          component={require("./(teacher-homepage)/index").default}
        />
        <Tab.Screen
          name="(reservation)"
          options={{ tabBarLabel: "Reservation" }}
          component={require("./(reservation)/index").default}
        />
        <Tab.Screen
          name="(profile)"
          options={{ tabBarLabel: "My Profile" }}
          component={require("./(profile)/index").default}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
