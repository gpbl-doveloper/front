// _layout.tsx
import React from "react";
import "@/global.css";
import "../../global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import AuthLayout from "./(auth)/_layout";
import MainLayout from "./(main)/_layout";
import MainScreen from ".";

const Stack = createStackNavigator();
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" component={MainScreen} />
        <Stack.Screen name="(auth)" component={AuthLayout} />
        <Stack.Screen name="(main)" component={MainLayout} />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
}
