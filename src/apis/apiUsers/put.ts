import axiosInstance from "../utils/axiosInstance";
import appConfig from "../utils/apiConfig";
import {handleApiError} from "../utils/errorHandler";

export const putUserData = async (idToken: string) => {
    try {
        const response = await axiosInstance.get(
            `${appConfig.apiUrl}api/user/update`,
            {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        handleApiError(error, "getParentsReservation");
    }
}
