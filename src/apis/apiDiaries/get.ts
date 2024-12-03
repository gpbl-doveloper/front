import axiosInstance from "../utils/axiosInstance";
import { handleApiError } from "../utils/errorHandler";

export interface DiaryRequestParams {
  dogId: number;
  date?: string;
  idToken: string;
}

// [parent] 알림장 받아오기
export const getParentDiary = async ({
  dogId,
  date,
  idToken,
}: DiaryRequestParams) => {
  const params = new URLSearchParams({
    dog: dogId.toString(),
    ...(date && { date }),
  });

  const apiURL = `api/diary?${params.toString()}`;
  try {
    const response = await axiosInstance.get(apiURL, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "getDiary");
  }
};

// [center] 알림장 받아오기
export const getCenterDiary = async ({ idToken, dogId }: any) => {
  try {
    const result = await axiosInstance.get(`/api/diary/note/info/${dogId}`, {
      headers: { Authorization: `Bearer ${idToken}` },
    });
    return result.data;
  } catch (error) {
    handleApiError(error, "getCenterDiary");
  }
};
