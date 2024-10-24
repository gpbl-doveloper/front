import { auth } from "@/firebaseConfig";
import { API_URL } from "@/src/apis/apiDiary";
import { postFormData } from "@/src/utils/apiUtils";
import { createAuthFormData } from "@/src/utils/formDataUtils";
import { createUserWithEmailAndPassword, getIdToken } from "firebase/auth";

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

export async function registerByFirebase(email: string, password: string) {
  try {
    // Firebase에 사용자 생성 요청
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    // Firebase Token 가져오기
    const token = await getIdToken(user);
    console.log("Registration Success At registerByFirebase");
    return token;
  } catch (error) {
    console.error("Registration Failed At registerByFirebase");
    throw error; // 원본 error 던지기
  }
}

export async function registerByBackend(token: string, name: string) {
  try {
    const formData = await createAuthFormData(token, name);
    const response = await postFormData(`${API_URL}/diary/add`, formData);
    console.log("Registration Success At registerByBackend");

    return response?.data;
  } catch (error) {
    console.error("Registration Failed At registerByBackend");
    throw error; // 원본 error 던지기
  }
}
