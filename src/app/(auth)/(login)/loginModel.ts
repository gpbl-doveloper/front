import { postSignIn } from "@/src/apis/apiAuth";
import { loginByFirebase } from "@/src/apis/apiFirebase";

export interface LoginModelProps {
  email: string;
  password: string;
}

export const loginTasks = async ({ email, password }: LoginModelProps) => {
  // email, password 사용해서 Firebase에서 idToken 불러오기
  const idToken = loginByFirebase({ email, password });
  // idToken을 사용해서 백엔드 로그인 처리
  const userData = await postSignIn(await idToken);
  
  return userData;
};
