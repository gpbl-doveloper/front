import { postDiary } from "@/src/apis/apiDiary";

export const postNotetoBackend = async ({ diaryData, idToken }: any) => {
  try {
    console.log(diaryData);
    const result = await postDiary({ diaryData, idToken });
    console.log(result);
  } catch (error) {
    console.error("Failed to post note:", error);
    throw error;
  }
};
