// (teacher-home)/_layout.tsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DogDetailScreen from ".";
import ProfilePage from "./(dog-profile)";
import NoteScreen from "./(write-note)";

const Stack = createStackNavigator();

export default function DogDetailLayout() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DogDetailScreen" component={DogDetailScreen} />
      <Stack.Screen name="DogProfile" component={ProfilePage} />
      <Stack.Screen name="WriteNote" component={NoteScreen} />
      <Stack.Screen name="DogPhotoSelect" component={NoteScreen} />
    </Stack.Navigator>
  );
}
