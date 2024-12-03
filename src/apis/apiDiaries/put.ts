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
