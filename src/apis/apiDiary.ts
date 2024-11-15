import { handleApiError } from "./utils/errorHandler";
import axiosInstance from "./utils/axiosInstance";

export interface DiaryRequestParams {
  id: number;
  date: string;
  idToken: string;
}

// [parent] 그날그날 받아올 알림장
export const getDiary = async ({ id, date, idToken }: DiaryRequestParams) => {
  try {
    const response = await axiosInstance.get(
      `api/diary?dog=${id}&date=${date}`,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    // console.log("Get Diary successful:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error, "getDiary");
  }
};

// [center] 알림장 작성
export const postDiary = async ({ diaryData, idToken }: any) => {
  try {
    const response = await axiosInstance.post("api/diary/add/note", diaryData, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    console.log("Post Diary successful:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error, "postDiary");
  }
};
