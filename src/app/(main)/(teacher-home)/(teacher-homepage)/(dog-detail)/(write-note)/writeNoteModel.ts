import { getCenterDiary } from "@/src/apis/apiDiaries/get";
import { postCenterDiary } from "@/src/apis/apiDiaries/post";
import { putCenterDiarySend } from "@/src/apis/apiDiaries/put";

export const getNoteAPI = async ({ idToken, dogId }: any) => {
  try {
    const result = await getCenterDiary({ idToken, dogId });
    console.log("getNoteAPI result:", result);
    return result;
  } catch (error) {
    console.error("Failed to get note:", error);
    throw error;
  }
};

// save note 시 사용
export const postNoteAPI = async ({ diaryData, idToken }: any) => {
  try {
    const result = await postCenterDiary(idToken, diaryData);
    return result.data.newDiaryNote;
  } catch (error) {
    console.error("Failed to post note:", error);
    throw error;
  }
};

// send note 시 사용
export const sendNoteAPI = async ({ idToken, diaryId }: any) => {
  try {
    const result = await putCenterDiarySend(idToken, diaryId);
    return result;
  } catch (error) {
    console.error("Failed to send note:", error);
    throw error;
  }
};
