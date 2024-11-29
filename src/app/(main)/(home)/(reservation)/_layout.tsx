import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { ReservationPage } from "./index";
import { AddReservationPage } from "./(add-reservation)";
import { ChooseDatePage } from "./(choose-date)";

const Stack = createStackNavigator();

export default function ReservationLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFF7E9" }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" component={ReservationPage} />
        <Stack.Screen name="AddReservation" component={AddReservationPage} />
        <Stack.Screen name="ChooseDate" component={ChooseDatePage} />
      </Stack.Navigator>
    </View>
  );
}
