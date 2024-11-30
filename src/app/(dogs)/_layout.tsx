// app/(auth)/_layout.tsx
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SelectDogPage from "./index";
import AddDog from "./(add-dogs)";
import DiaryLayout from "../(main)/(home)/(diary)/_layout";
import PhotoSelector from "./(add-photo)";

const Stack = createStackNavigator();

export default function SelectDogLayout() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SelectDog" component={SelectDogPage} />
      <Stack.Screen name="AddDog" component={AddDog} />
      <Stack.Screen name="PhotoSelector" component={PhotoSelector} />
      <Stack.Screen name="Home" component={DiaryLayout} />
    </Stack.Navigator>
  );
}
