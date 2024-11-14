import React from "react";
import { Text, View, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { mainStyles } from "./mainStyles";
import { ButtonBigSize } from "../components/Buttons";
import { MainLogo } from "../components/Logos";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

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

type RootStackParamList = {
  "(auth)": { screen: string };
  SignIn: undefined;
  SignUp: undefined;
  "(main)": { screen: string };
};

type AuthNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "(auth)"
>;

function MainButtonContainer() {
  const navigation = useNavigation<AuthNavigationProp>();
  return (
    <View style={mainStyles.buttonContainer}>
      <ButtonBigSize
        buttonColor={"purple"}
        onPress={() =>
          navigation.navigate("(auth)", {
            screen: "SignIn",
          })
        }
        text={"Sign In"}
      />

      <ButtonBigSize
        buttonColor={"white"}
        onPress={() =>
          navigation.navigate("(auth)", {
            screen: "SignUp",
          })
        }
        text={"Create account"}
      />
      <ButtonBigSize
        buttonColor={"white"}
        onPress={() =>
          navigation.navigate("(main)", {
            screen: "(home)", // MainLayout의 (home) 네비게이터
          })
        }
        text={"Center"}
      />
      <ButtonBigSize
        buttonColor={"white"}
        onPress={() =>
          navigation.navigate("(main)", {
            screen: "(teacher-home)", // MainLayout의 (home) 네비게이터
          })
        }
        text={"Parents"}
      />
    </View>
  );
}
