import axiosInstance from "../utils/axiosInstance";
import appConfig from "../utils/apiConfig";
import { handleApiError } from "../utils/errorHandler";

// [parent, center] 유저 정보 불러오기
export const getUserData = async (idToken: string, userId: any) => {
  try {
    const response = await axiosInstance.get(
      `${appConfig.apiUrl}api/user/info/${userId}`,
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
