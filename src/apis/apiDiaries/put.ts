import axiosInstance from "../utils/axiosInstance";
import { handleApiError } from "../utils/errorHandler";

// [center] 알림장 전송
export const putCenterDiarySend = async (idToken: string, diaryId: number) => {
  try {
    const response = await axiosInstance.put(
      `/api/diary/send/note/${diaryId}`,
      {},
      {
        headers: { Authorization: `Bearer ${idToken}` },
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "sendCenterDiary");
  }
};

// [center] 사진 전송
export const putCenterPhotoSend = async (
  idToken: string,
  diaryId: number,
  pictureIds: number[]
) => {
  try {
    console.log("pictureIds : ", pictureIds);
    console.log("diaryId : ", diaryId);
    const response = await axiosInstance.put(
      `/api/diary/send/photo/${diaryId}`,
      { pictureIds: pictureIds },
      {
        headers: { Authorization: `Bearer ${idToken}` },
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "sendCenterDiaryPhoto");
  }
};
