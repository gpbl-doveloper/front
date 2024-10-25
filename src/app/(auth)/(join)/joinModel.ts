import { auth } from "@/firebaseConfig";
import { API_URL } from "@/src/apis/apiDiary";
import { postFormData } from "@/src/utils/apiUtils";
import { createAuthFormData } from "@/src/utils/formDataUtils";
import { createUserWithEmailAndPassword, getIdToken } from "firebase/auth";

export interface AuthCredentials {
  email: string;
  password: string;
}

export async function registerByFirebase({ email, password }: AuthCredentials) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const token = await getIdToken(user);
    console.log("Registration Success At registerByFirebase");
    return token;
  } catch (error) {
    console.error("Registration Failed At registerByFirebase");
    throw error;
  }
}

export async function registerByBackend(token: string, username: string) {
  try {
    const formData = await createAuthFormData(token, username);
    const response = await postFormData(`${API_URL}/diary/add`, formData);
    console.log("Registration Success At registerByBackend");

    return response?.data;
  } catch (error) {
    console.error("Registration Failed At registerByBackend");
    throw error;
  }
}
