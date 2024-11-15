import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getIdToken,
} from "firebase/auth";
import { LoginModelProps } from "../app/(auth)/(login)/loginModel";
import { auth } from "@/firebaseConfig";

export const loginByFirebase = async ({
  email,
  password,
}: LoginModelProps): Promise<string> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const idToken = await userCredential.user.getIdToken();

    console.log("Login Success At Firebase");
    return idToken;
  } catch (error) {
    console.error("Login Failed At Firebase", error);
    throw error;
  }
};

export async function registerByFirebase({ email, password }: LoginModelProps) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const token = await getIdToken(user);
    console.log("Register Success At Firebase");
    return token;
  } catch (error) {
    console.error("Register Failed At Firebase");
    throw error;
  }
}
