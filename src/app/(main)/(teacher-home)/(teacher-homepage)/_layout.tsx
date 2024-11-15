import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TeacherHomePage from "./(main)";
import SearchPage from "./(search)";
import DogDetailLayout from "./(dog-detail)/_layout";
import PhotoSelector from "@/src/app/(photo-selector)";
// import PhotoSelector from "./(dog-detail)/(dog-photo-select)";

const Stack = createStackNavigator();

export default function TeacherHomePageLayout() {
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
        <Stack.Screen
          name="PhotoSelector"
          component={PhotoSelector}
          options={{ title: "Select Photos" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
