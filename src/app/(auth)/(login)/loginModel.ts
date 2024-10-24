import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { Alert } from "react-native";
import { auth } from "@/firebaseConfig";
import { createAuthFormData } from "@/src/utils/formDataUtils";
import { API_URL } from "@/src/apis/apiDiary";
import { postFormData } from "@/src/utils/apiUtils";

interface LoginModelProps {
  email: string;
  password: string;
}

interface User {
  email: string;
  name: string;
}

export const loginByFirebase = async ({
  email,
  password,
}: LoginModelProps): Promise<{ user: User } | { error: string }> => {
  try {
    const userCredential: Promise<UserCredential> = signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = (await userCredential).user;

    if (!user.email) {
      throw new Error("Email is null");
    }
    return { user: { email: user.email, name: "Guest" } };
  } catch (error) {
    const errorMessage = (error as Error).message;
    Alert.alert("Login Failed", errorMessage);
    return { error: errorMessage };
  }
};

export async function loginByBackend(email: string, password: string) {
  try {
    const formData = await createAuthFormData(email, password);
    const response = await postFormData(`${API_URL}/auth/login`, formData);
    console.log("Login Success At loginByBackend");

    return response.data;
  } catch (error) {
    console.error("Login Failed At loginByBackend");
    throw error;
  }
}
