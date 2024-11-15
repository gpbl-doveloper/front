// (main)/_layout.tsx
import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ParentsHomeLayout from "./(home)/_layout";
import DogProfileScreen from "./(dogs)";
import TeacherHomeLayout from "./(teacher-home)/_layout";

const Stack = createStackNavigator();
export default function MainLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(home)" component={ParentsHomeLayout} />
        <Stack.Screen name="(teacher-home)" component={TeacherHomeLayout} />
        <Stack.Screen name="(dogs)" component={DogProfileScreen} />
      </Stack.Navigator>
    </View>
  );
}
