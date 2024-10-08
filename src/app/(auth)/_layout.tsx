// _layout.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";

import LoginScreen from "./login";
import RegisterScreen from "./register";
import { useUserStore } from "@/src/store/userStore";

const Tab = createBottomTabNavigator();

export default function AuthLayout() {
  const setUser = useUserStore((state) => state.setUser); // 타입 자동 추론 ((user: User) => void)
  const resetUser = useUserStore((state) => state.resetUser); // 타입 자동 추론 (() => void)

  return (
    <Tab.Navigator
      initialRouteName="Login"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#42f44b", // 활성화된 탭 색상
        tabBarInactiveTintColor: "gray", // 비활성화된 탭 색상
        tabBarLabel: ({ focused }) => (
          <Text style={{ color: focused ? "#42f44b" : "gray", fontSize: 12 }}>
            {route.name}
          </Text>
        ),
      })}
    >
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
