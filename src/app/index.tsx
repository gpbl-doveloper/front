import React from "react";
import { Text, View, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { mainStyles } from "./mainStyles";
import { ButtonBigSize } from "../components/Buttons";
import { navigationController } from "./mainController";
import { MainLogo } from "../components/Logos";

export default function MainScreen() {
  return (
    <MainContainer>
      <MainLogo width={200} height={150} />
      <MainTexts />
      <MainButtonContainer />
    </MainContainer>
  );
}

export function MainContainer({ children }: any) {
  return (
    <SafeAreaView style={mainStyles.container}>
      <StatusBar style="dark" />
      {children}
    </SafeAreaView>
  );
}

function MainTexts() {
  return (
    <View style={mainStyles.welcomeContainer}>
      <Text style={mainStyles.welcomeTitle}>Welcome!</Text>
      <Text style={mainStyles.welcomeSubtitle}>
        With Pawsome Day,{"\n"}make you and your pet's day Awsome.
      </Text>
    </View>
  );
}

function MainButtonContainer() {
  return (
    <View style={mainStyles.buttonContainer}>
      <ButtonBigSize
        buttonColor={"purple"}
        onPress={navigationController.goToLogin}
        text={"Sign In"}
      />

      <ButtonBigSize
        buttonColor={"white"}
        onPress={navigationController.goToJoin}
        text={"Create account"}
      />
      <ButtonBigSize
        buttonColor={"white"}
        onPress={navigationController.goToTest}
        text={"Center"}
      />
      <ButtonBigSize
        buttonColor={"white"}
        onPress={navigationController.goToParent}
        text={"Parents"}
      />
    </View>
  );
}
