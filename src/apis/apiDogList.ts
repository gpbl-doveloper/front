import appConfig from "./utils/apiConfig";
import { handleApiError } from "./utils/errorHandler";
import axiosInstance from "./utils/axiosInstance";

// [center] 예약한 강아지 목록
export const getDogList = async (idToken: string) => {
  try {
    const response = await axiosInstance.get(
      `${appConfig.apiUrl}api/dog/reservations/today`,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    console.log("Get Dog List successful: ", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error, "getDogList");
  }
};
