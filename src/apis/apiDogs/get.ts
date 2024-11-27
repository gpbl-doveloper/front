// [parent] 사용자의 강아지 목록
import axiosInstance from "../utils/axiosInstance";
import appConfig from "../utils/apiConfig";
import {handleApiError} from "../utils/errorHandler";

// [parent] 사용자의 강아지 목록
export const getParentDogList = async (idToken: string) => {
    try {
        const response = await axiosInstance.get(
            `${appConfig.apiUrl}api/dog/all`,
            {
                headers: {
                    Authorization: `Bearer ${idToken}`
                },
            }
        );
        console.log("Response Successful @getUserDogList: ", response.data);
        return response.data;
    } catch (error) {
        handleApiError(error, "getUserDogList");
    }
};


// [center] 예약한 강아지 목록
export const getCenterDogList = async (idToken: string) => {
    try {
        const response = await axiosInstance.get(
            `${appConfig.apiUrl}api/dog/reservations/today`,
            {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            }
        );
        console.log("Get Reserved Dog List successful");
        return response.data;
    } catch (error) {
        handleApiError(error, "getDogList");
    }
};

// [parent, center] 강아지 정보 가져오기
export const getDogInfo = async (idToken: string, dogId: string) => {
    try {
        const response = await axiosInstance.get(
            `${appConfig.apiUrl}api/dog/info/${dogId}`,
            {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            }
        );
        console.log("Get Dog Info successful");
        return response.data;
    } catch (error) {
        handleApiError(error, "getDogInfo");
    }
};