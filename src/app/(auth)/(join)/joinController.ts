import { Alert } from "react-native";
import {
  AuthCredentials,
  registerByBackend,
  registerByFirebase,
} from "./joinModel";

const showErrorAlert = (title: string, message: string) => {
  Alert.alert(title, message);
};

export const joinController = {
  // Firebase Check
  async firebaseCheck(
    { email, password }: AuthCredentials,
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
  async backendJoin(token: string, username: string) {
    try {
      await registerByBackend(token, username); // Backend 처리
    } catch (error) {
      console.error("Backend Error:", error);
      showErrorAlert("Error", "Backend join failed.");
    }
  },
};
