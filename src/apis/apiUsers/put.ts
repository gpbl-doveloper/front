import axiosInstance from "../utils/axiosInstance";
import appConfig from "../utils/apiConfig";
import { handleApiError } from "../utils/errorHandler";

// 사용자 정보 수정
export const putUserData = async (idToken: string, editingUser: any) => {
  try {
    const response = await axiosInstance.put(
      `${appConfig.apiUrl}api/user/update`,
      editingUser,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "getParentsReservation");
  }
};
