import axiosInstance from "../utils/axiosInstance";
import appConfig from "../utils/apiConfig";
import {handleApiError} from "../utils/errorHandler";

// [center] 예약 수락
export const putCenterAcceptReservation = async (idToken: string, reservationId: number) => {
    try {
        const response = await axiosInstance.put(
            `${appConfig.apiUrl}api/reservation/accept/${reservationId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        handleApiError(error, "putAcceptReservation");
    }
}

// [center] 예약 거절
export const putCenterRejectReservation = async (idToken: string, reservationId: number) => {
    try {
        const response = await axiosInstance.put(
            `${appConfig.apiUrl}api/reservation/decline/${reservationId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        handleApiError(error, "putRejectReservation");
    }
}