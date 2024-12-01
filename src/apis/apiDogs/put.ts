// [parent] 사용자의 강아지 정보 수정
// 수정할 필드만 추가해서 요청
import appConfig from "../utils/apiConfig";
import axiosInstance from "../utils/axiosInstance";
import { handleApiError } from "../utils/errorHandler";
import { PostParentDogProps } from "./post";

export type UpdateUserDogProps = Partial<PostParentDogProps>;

export const putParentDog = async (
  idToken: string,
  dogId: number,
  dogDetails: UpdateUserDogProps
) => {
  try {
    const response = await axiosInstance.put(
      `${appConfig.apiUrl}api/dog/update/${dogId}`,
      dogDetails,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "putUserDog");
  }
};
