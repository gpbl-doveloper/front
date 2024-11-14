// (main)/_layout.tsx
import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ParentsHomeLayout from "./(home)/_layout";
import TeacherHomeLayout from "./(teacher-home)/(teacher-homepage)/_layout";

const Stack = createStackNavigator();
export default function MainLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="(home)"
          options={{
            title: "Home",
          }}
          component={ParentsHomeLayout}
        />
        <Stack.Screen
          name="(teacher-home)"
          options={{ title: "Teacher's Home" }}
          component={TeacherHomeLayout}
        />
      </Stack.Navigator>
    </View>
  );
}
