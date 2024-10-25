import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { createAuthFormData } from "@/src/utils/formDataUtils";
import { API_URL } from "@/src/apis/apiDiary";
import { postFormData } from "@/src/utils/apiUtils";

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
    const formData = await createAuthFormData(email, password);
    const response = await postFormData(`${API_URL}/auth/login`, formData);
    console.log("Login Success At loginByBackend");

    return response?.data;
  } catch (error) {
    console.error("Login Failed At loginByBackend");
    throw error;
  }
}
// export async function registerByBackend(token: string, name: string) {
//   try {
//     const formData = await createAuthFormData(token, name);
//     const response = await postFormData(`${API_URL}/diary/add`, formData);
//     console.log("Registration Success At registerByBackend");

//     return response?.data;
//   } catch (error) {
//     console.error("Registration Failed At registerByBackend");
//     throw error;
//   }
// }
