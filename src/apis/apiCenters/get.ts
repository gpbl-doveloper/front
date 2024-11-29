// [parent], [center] 센터 정보 가져오기
import axiosInstance from "../utils/axiosInstance";
import appConfig from "../utils/apiConfig";
import { handleApiError } from "../utils/errorHandler";

export const getCenterInfo = async (idToken: string, centerId: any) => {
  try {
    const response = await axiosInstance.get(
      `${appConfig.apiUrl}api/center/info/${centerId}`,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "getCenterInfo");
  }
};

// [parent] Reservation 시 센터 검색
export const getCenterList = async (idToken: string, searchText: string) => {
  try {
    const response = await axiosInstance.get(
      `${appConfig.apiUrl}api/center/search?name=${searchText}`,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "getCenterList");
  }
};
