import React from "react";
// import { Stack } from "expo-router/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TeacherHomePage from "./(main)";
import SearchPage from "./(search)";
import DogDetailLayout from "./(dog-detail)/_layout";

const Stack = createStackNavigator();

export default function TeacherHomeLayout() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="TeacherMain"
          component={TeacherHomePage}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="Search"
          component={SearchPage}
          options={{ title: "Search" }}
        />
        <Stack.Screen
          name="DogDetail"
          component={DogDetailLayout}
          options={{ title: "Detail" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
