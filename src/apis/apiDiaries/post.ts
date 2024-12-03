import axiosInstance from "../utils/axiosInstance";
import { handleApiError } from "../utils/errorHandler";

interface PostDiaryData {
  dogId: number;
  activities: string;
  feedingTime: number;
  feedingAmt: string;
  napStart: string;
  napEnd: string;
  note: string;
}

// [center] 알림장 작성
export const postCenterDiary = async (
  idToken: string,
  diaryData: PostDiaryData
) => {
  try {
    const response = await axiosInstance.post("api/diary/add/note", diaryData, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    console.log("이거 보냄:", diaryData);
    console.log("Post Diary successful:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error, "postDiary");
  }
};