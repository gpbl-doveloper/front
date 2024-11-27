// [parent] 사용자의 강아지 삭제
import {handleApiError} from "../utils/errorHandler";
import axiosInstance from "../utils/axiosInstance";
import appConfig from "../utils/apiConfig";

export const deleteParentDog = async (idToken: string, dogId: string) => {
    try {
        const response = await axiosInstance.delete(
            `${appConfig.apiUrl}api/dog/delete/${dogId}`,
            {
                headers: {
                    Authorization: `Bearer ${idToken}`
                },
            }
        );
        return response.data;
    } catch (error) {
        handleApiError(error, "deleteUserDog");
    }
}
