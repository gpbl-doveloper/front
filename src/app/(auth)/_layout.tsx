// app/(auth)/_layout.tsx
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import JoinView from "./(join)";
import LoginView from "./(login)";
import SelectDogLayout from "../(dogs)/_layout";
import AddCenterPage from "../(center)";
import TeacherHomeLayout from "../(main)/(teacher-home)/_layout";

const Stack = createStackNavigator();

export default function AuthLayout() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={LoginView} />
      <Stack.Screen name="SignUp" component={JoinView} />
      <Stack.Screen name="SelectDogLayout" component={SelectDogLayout} />
      <Stack.Screen name="AddCenterPage" component={AddCenterPage} />
      <Stack.Screen name="(teacher-home)" component={TeacherHomeLayout} />
    </Stack.Navigator>
  );
}
