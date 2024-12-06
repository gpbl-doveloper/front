import { getCenterDiary } from "@/src/apis/apiDiaries/get";
import { getDogInfo } from "@/src/apis/apiDogs/get";
import {
  getCenterTodayDogPicture,
  getCenterTodayPicture,
} from "@/src/apis/apiPictures/get";
import { handleApiError } from "@/src/apis/utils/errorHandler";
import { handlePhotoApiError } from "@/src/utils/errors/handleApiErrors";

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

// [center] 오늘 올린 모든 사진 불러오기
export const getCenterTodayPictureAPI = async (idToken: string, date: any) => {
  try {
    const response = await getCenterTodayPicture(idToken, date);
    return response.data.files;
  } catch (error) {
    handleApiError(error, "getCenterTodayPictureAPI");
  }
};

// [center] 오늘의 특정 강아지 사진 불러오기
export const getDogPictureAPI = async (idToken: string, dogId: number) => {
  try {
    const response = await getCenterTodayDogPicture(idToken, dogId);
    return response.data.diaryPhoto.pictures;
  } catch (error) {
    handlePhotoApiError(error, "getDogPictureAPI");
    return [];
  }
};
