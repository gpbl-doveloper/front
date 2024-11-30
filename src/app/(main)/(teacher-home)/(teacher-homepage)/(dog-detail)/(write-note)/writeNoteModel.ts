import {postCenterDiary} from "../../../../../../apis/apiDiaries/post";

export const postNotetoBackend = async ({diaryData, idToken}: any) => {
    try {
        console.log(diaryData);
        const result = await postCenterDiary(idToken, diaryData);
        console.log(result);
    } catch (error) {
        console.error("Failed to post note:", error);
        throw error;
    }
};
