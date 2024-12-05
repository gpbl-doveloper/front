import { putCenterPhotoSend } from "@/src/apis/apiDiaries/put";
import { handleApiError } from "@/src/apis/utils/errorHandler";

export const sendPhotoAPI = async ({
  idToken,
  diaryId,
  pictureIds,
}: {
  idToken: string;
  diaryId: number;
  pictureIds: number[];
}) => {
  try {
    const response = await putCenterPhotoSend(idToken, diaryId, pictureIds);
    return response;
  } catch (error) {
    handleApiError(error, "sendPhotoAPI");
  }
};
