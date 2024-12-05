import { handleApiError } from "../utils/errorHandler";
import axiosInstance from "../utils/axiosInstance";
import appConfig from "../utils/apiConfig";

export const getCenterTodayPicture = async (idToken: string, date: any) => {
  try {
    const response = await axiosInstance.get(
      `${appConfig.apiUrl}api/picture/all?date=${date}`,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "getCenterTodayPicture");
  }
};
