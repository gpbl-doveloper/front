// (main)/_layout.tsx
import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ParentsHomeLayout from "./(home)/_layout";
import TeacherHomeLayout from "./(teacher-home)/_layout";

const Stack = createStackNavigator();
export default function MainLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFF7E9" }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name="(home)" component={ParentsHomeLayout} />
        <Stack.Screen name="(teacher-home)" component={TeacherHomeLayout} />
      </Stack.Navigator>
    </View>
  );
}
