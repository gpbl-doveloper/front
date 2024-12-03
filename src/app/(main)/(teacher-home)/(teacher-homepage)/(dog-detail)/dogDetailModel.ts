import { getCenterDiary } from "@/src/apis/apiDiaries/get";
import { getDogInfo } from "@/src/apis/apiDogs/get";
import { handleApiError } from "@/src/apis/utils/errorHandler";

export const getDogDetailAPI = async (idToken: string, dogId: number) => {
  try {
    const response = await getDogInfo(idToken, dogId);
    return response.data;
  } catch (error) {
    handleApiError(error, "getDogDetailAPI");
  }
};

// [center] 알림장 받아오기
export const getDogDiaryAPI = async (idToken: string, dogId: number) => {
  try {
    const response = await getCenterDiary({ idToken, dogId });
    return response.data.diaryNote;
  } catch (error: unknown) {
    if ((error as any).response?.status === 404) {
      return null; // 알림장이 없는 경우
    }
    handleApiError(error, "getDogDiaryAPI");
    return null;
  }
};
