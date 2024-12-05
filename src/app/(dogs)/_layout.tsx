// app/(auth)/_layout.tsx
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SelectDogPage from "./index";
import AddDog from "./(add-dogs)";
import PhotoSelector from "./(add-photo)";
import ParentsHomeLayout from "../(main)/(home)/_layout";
import { View } from "react-native";

const Stack = createStackNavigator();

export default function SelectDogLayout() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SelectDog" component={SelectDogPage} />
      <Stack.Screen name="AddDog" component={AddDog} />
      <Stack.Screen name="PhotoSelector" component={PhotoSelector} />
      <Stack.Screen name="ParentsHome" component={ParentsHomeLayout} />
    </Stack.Navigator>
  );
}
