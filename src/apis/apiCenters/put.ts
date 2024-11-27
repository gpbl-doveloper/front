
// Partial<T> 유틸리티 타입을 사용하면 기존 CenterDetails 인터페이스를 기반으로 모든 속성을 선택적으로 만들 수 있습니다.
import axiosInstance from "../utils/axiosInstance";
import appConfig from "../utils/apiConfig";
import {handleApiError} from "../utils/errorHandler";
import {CenterDetails} from "./post";

type UpdateCenterDetails = Partial<CenterDetails>;
// [center] 센터 정보 수정
export const putCenterInfo = async (idToken: string, centerId: string, centerDetails: UpdateCenterDetails) => {
    try {
        const response = await axiosInstance.put(
            `${appConfig.apiUrl}api/center/update/${centerId}`,
            centerDetails,
            {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        handleApiError(error, "putCenterInfo");
    }
}