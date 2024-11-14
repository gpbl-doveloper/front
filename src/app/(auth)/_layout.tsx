// app/(auth)/_layout.tsx
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import JoinView from "./(join)";
import LoginView from "./(login)";

const Stack = createStackNavigator();

export default function AuthLayout() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={LoginView} />
      <Stack.Screen name="SignUp" component={JoinView} />
    </Stack.Navigator>
  );
}
