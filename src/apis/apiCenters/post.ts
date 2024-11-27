import axiosInstance from "../utils/axiosInstance";
import appConfig from "../utils/apiConfig";
import {handleApiError} from "../utils/errorHandler";

export interface CenterDetails {
    name: string;
    phone: string;
    address: string;
    description: string;
}

export const postCenterInfo = async (idToken: string, centerDetails: CenterDetails) => {
    try {
        const response = await axiosInstance.post(
            `${appConfig.apiUrl}api/center/add`,
            centerDetails,
            {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        handleApiError(error, "postCenterInfo");
    }
}
