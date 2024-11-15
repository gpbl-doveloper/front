import { Alert } from "react-native";
import { postSignUp } from "@/src/apis/apiAuth";
import { useNavigation } from "expo-router";
import { LoginModelProps } from "../(login)/loginModel";
import { registerByFirebase } from "@/src/apis/apiFirebase";

const showErrorAlert = (title: string, message: string) => {
  Alert.alert(title, message);
};

export const joinController = {
  // Firebase Check
  async firebaseCheck(
    { email, password }: LoginModelProps,
    setToken: (token: string) => void,
    setFirebaseSuccess: (success: boolean) => void
  ) {
    try {
      const token = await registerByFirebase({ email, password }); // Firebase 처리
      if (token) {
        setToken(token); // 토큰 설정
        setFirebaseSuccess(true); // 성공 플래그 설정
      } else {
        showErrorAlert("Error", "Invalid email or password.");
      }
    } catch (error) {
      console.error("Firebase Error:", error);
      showErrorAlert("Error", `Firebase authentication failed: ${error}`);
    }
  },

  // Backend Join
  async signUp(token: string, data: SignUpData) {
    try {
      let SignUpData = await postSignUp(token, data); // Backend 처리
      console.log(SignUpData);
      console.log("Backend join success.");
    } catch (error) {
      console.error("Backend Error:", error);
      showErrorAlert("Error", "Backend join failed.");
    }
  },
};

interface SignUpData {
  name: string;
  role: string;
  phone: string;
}
