import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { createAuthFormData } from "@/src/utils/formDataUtils";
import { API_URL } from "@/src/apis/apiDiary";
import { postData } from "@/src/utils/apiUtils";

interface LoginModelProps {
  email: string;
  password: string;
}

export const loginByFirebase = async ({ email, password }: LoginModelProps) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    console.log("Login Success At loginByFirebase");
    return user;
  } catch (error) {
    console.error("Login Failed", error);
    throw error;
  }
};

export async function loginByBackend(email: string, password: string) {
  try {
    const loginData = {
      user_id: email,
      password: password,
    };

    const response = await postData(`${API_URL}/auth/login`, loginData);
    console.log("Login Success At loginByBackend");

    return response?.data;
  } catch (error) {
    console.error("Login Failed At loginByBackend");
    throw error;
  }
}