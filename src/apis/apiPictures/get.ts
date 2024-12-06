import { handleApiError } from "../utils/errorHandler";
import axiosInstance from "../utils/axiosInstance";
import appConfig from "../utils/apiConfig";
import { handlePhotoApiError } from "@/src/utils/errors/handleApiErrors";

// [center] 오늘 사진 불러오기, 모든 사람들이 올린 사진들 다 가져옴
export const getCenterTodayPicture = async (idToken: string, date: any) => {
  try {
    const response = await axiosInstance.get(
      `${appConfig.apiUrl}api/picture/all?date=${date}`,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "getCenterTodayPicture");
  }
};

// [center] 오늘 사진 불러오기, 특정 강아지 사진 불러오기
export const getCenterTodayDogPicture = async (
  idToken: string,
  dogId: number
) => {
  try {
    const response = await axiosInstance.get(`/api/diary/photo/info/${dogId}`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    return response.data;
  } catch (error) {
    const isNotFound = handlePhotoApiError(error, "getCenterTodayDogPicture");
    return { data: { diaryPhoto: { pictures: [] } } }; // 에러 시 빈 pictures 배열을 포함한 객체 반환
  }
};
