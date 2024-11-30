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
