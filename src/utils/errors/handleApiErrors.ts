import { handleApiError } from "@/src/apis/utils/errorHandler";

// 기존 handleApiError 함수 아래에 추가
export const isNotFoundError = (error: any): boolean => {
  return (
    error?.response?.status === 500 &&
    error?.response?.data?.message?.includes(
      "NotFoundError: No DiaryPhoto found"
    )
  );
};

export const handlePhotoApiError = (error: any, functionName: string) => {
  if (isNotFoundError(error)) {
    return true; // NotFoundError인 경우
  }
  handleApiError(error, functionName);
  return false; // 다른 에러인 경우
};
