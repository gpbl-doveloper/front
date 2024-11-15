import { AxiosRequestConfig } from "axios";
import { handleApiError } from "./utils/errorHandler";
import axiosInstance from "./utils/axiosInstance";

/**
 * 재사용 가능한 API 요청 함수
 * @param endpoint API 엔드포인트
 * @param idToken 인증 토큰
 * @param data 요청 본문 데이터 (선택 사항)
 * @returns API 응답 데이터
 */
export const apiAuthRequest = async (
  endpoint: string,
  idToken: string,
  data?: any,
  method: AxiosRequestConfig["method"] = "post"
) => {
  try {
    const response = await axiosInstance({
      url: endpoint,
      method,
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      data,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    handleApiError(error, "apiAuth"); // 공통 에러 처리 함수 호출
  }
};

// postSignIn 함수
export const postSignIn = async (idToken: string) => {
  // console.log(idToken);
  return apiAuthRequest("api/auth/login", idToken);
};

// postSignUp 함수
export const postSignUp = async (idToken: string, data: any) => {
  return apiAuthRequest("api/auth/signup", idToken, data);
};

