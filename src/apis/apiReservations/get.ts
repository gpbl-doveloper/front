import axiosInstance from "../utils/axiosInstance";
import appConfig from "../utils/apiConfig";
import { handleApiError } from "../utils/errorHandler";

// [parent] 예약 정보 가져오기
export const getParentReservation = async (idToken: string) => {
  try {
    const response = await axiosInstance.get(
      `${appConfig.apiUrl}api/reservation/owner/all`,
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
};

// [center] 예약 정보 가져오기
export const getCenterReservation = async (idToken: string) => {
  try {
    const response = await axiosInstance.get(
      `${appConfig.apiUrl}api/reservation/center/all`,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "getCentersReservation");
  }
};
