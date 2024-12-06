import { putCenterPhotoSend } from "@/src/apis/apiDiaries/put";
import { handleApiError } from "@/src/apis/utils/errorHandler";

export const sendPhotoAPI = async ({
  idToken,
  diaryPhotoId,
  pictureIds,
}: {
  idToken: string;
  diaryPhotoId: number;
  pictureIds: number[];
}) => {
  try {
    const response = await putCenterPhotoSend(
      idToken,
      diaryPhotoId,
      pictureIds
    );
    return response;
  } catch (error) {
    handleApiError(error, "sendPhotoAPI");
  }
};
