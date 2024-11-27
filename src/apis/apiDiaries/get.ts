import axiosInstance from "../utils/axiosInstance";
import {handleApiError} from "../utils/errorHandler";

export interface DiaryRequestParams {
    dogId: number;
    date?: string;
    idToken: string;
}

// [parent] 알림장 받아오기
export const getParentDiary = async ({
                                         dogId,
                                         date,
                                         idToken,
                                     }: DiaryRequestParams) => {
    let apiURL = `api/diary?dog=${dogId}&date=${date}`;
    try {
        if (!date) {
            apiURL = `api/diary?dog=${dogId}`;
        }
        const response = await axiosInstance.get(apiURL, {
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        });
        console.log(apiURL);
        // console.log("Get Diary successful:", response.data);
        return response.data;
    } catch (error) {
        handleApiError(error, "getDiary");
    }
};
