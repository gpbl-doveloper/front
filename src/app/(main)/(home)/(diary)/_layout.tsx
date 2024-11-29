import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import TodayScreen from ".";
import ProfilePage from "./(dog-profile)";

const Stack = createStackNavigator();

export default function DiaryLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFF7E9" }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" component={TodayScreen} />
        <Stack.Screen name="/(dog-profile)/index" component={ProfilePage} />
      </Stack.Navigator>
    </View>
  );
}
