// [center] 센터 삭제
import appConfig from "../utils/apiConfig";
import axiosInstance from "../utils/axiosInstance";
import {handleApiError} from "../utils/errorHandler";

export const deleteCenter = async (idToken: string, centerId: string) => {
    try {
        const response = await axiosInstance.delete(
            `${appConfig.apiUrl}api/center/delete/${centerId}`,
            {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        handleApiError(error, "deleteCenter");
    }
}