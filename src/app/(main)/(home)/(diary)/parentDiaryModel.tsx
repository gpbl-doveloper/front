import {DiaryRequestParams, getParentDiary} from "../../../../apis/apiDiaries/get";

export const getDiaryfromAPI = async ({
                                          dogId,
                                          date,
                                          idToken,
                                      }: DiaryRequestParams) => {
    try {
        const result = await getParentDiary({
            dogId: dogId,
            date: date,
            idToken: idToken,
        });

        return result;
    } catch (error) {
        console.error(error);
    }
};
