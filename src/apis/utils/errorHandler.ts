import axios from "axios";

export const handleApiError = (error: unknown, functionName: string) => {
  if (axios.isAxiosError(error)) {
    console.error(
      `API Request failed at ${functionName}:`,
      error.response?.status,
      error.response?.data
    );
  } else {
    console.error("Unknown error occurred:", error);
  }
  throw error; // 에러를 다시 던져 상위에서 추가 처리 가능
};
