import axios, { AxiosRequestConfig } from "axios";
import Constants from "expo-constants";

const appConfig = Constants.expoConfig?.extra;

if (!appConfig || !appConfig.apiUrl) {
  console.error("API_URL이 설정되지 않았습니다.");
  throw new Error("API_URL이 설정되지 않았습니다.");
}

/**
 * 재사용 가능한 API 요청 함수
 * @param endpoint API 엔드포인트
 * @param idToken 인증 토큰
 * @param data 요청 본문 데이터 (선택 사항)
 * @returns API 응답 데이터
 */
const apiAuthRequest = async (
  endpoint: string,
  idToken: string,
  data?: any
) => {
  const config: AxiosRequestConfig = {
    method: "post",
    url: `${appConfig.apiUrl}${endpoint}`,
    headers: {
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
    data,
  };

  try {
    const response = await axios(config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Axios error:",
        error.response?.status,
        error.response?.data
      );
    } else {
      console.error("Unknown error:", error);
    }
    throw error;
  }
};

// postSignIn 함수
export const postSignIn = async (idToken: string) => {
  console.log(idToken);
  return apiAuthRequest("api/auth/login", idToken);
};

// postSignUp 함수
export const postSignUp = async (idToken: string, data: any) => {
  return apiAuthRequest("api/auth/signup", idToken, data);
};
