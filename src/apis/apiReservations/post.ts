import axiosInstance from "../utils/axiosInstance";
import appConfig from "../utils/apiConfig";
import {handleApiError} from "../utils/errorHandler";

interface ReservationData {
    dogId: number;
    date: string;
}

// [parent] 특정 센터에 예약 신청
export const postParentReservation = async (idToken: string, reservationData: ReservationData) => {
    try {
        const response = await axiosInstance.post(
            `${appConfig.apiUrl}api/reservation/add`,
            reservationData,
            {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        handleApiError(error, "postReservation");
    }
}