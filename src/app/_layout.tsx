// _layout.tsx\
import React from "react";
import "../../global.css";
import { Stack } from "expo-router";
import { createStackNavigator } from "@react-navigation/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
