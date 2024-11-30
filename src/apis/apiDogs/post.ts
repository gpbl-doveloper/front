import axios from "axios";
import appConfig from "../utils/apiConfig";
import { handleApiError } from "../utils/errorHandler";

export interface PostParentDogProps {
  name: string;
  sex: string;
  isNeutered: boolean;
  breed: string;
  bod: string;
}

// [parent] 사용자의 강아지 추가
export const postParentDog = async (
  idToken: string,
  photoUris: string[],
  dogDetails: PostParentDogProps
) => {
  try {
    console.log("photoUris : ", photoUris);
    // FormData 생성
    const formData = new FormData();

    // 사진 파일 추가
    // 각 사진 URI를 직접 FormData에 추가
    photoUris.forEach((photoUri, index) => {
      // 파일 이름 추출
      const originalFileName =
        photoUri.split("/").pop() || `dog_photo_${index + 1}`;

      // FormData에 직접 파일 객체 추가
      formData.append("files", {
        uri: photoUri,
        name: originalFileName,
        type: "image/jpeg", // 또는 파일 타입에 따라 동적으로 설정
      } as any);
    });

    // 강아지 정보 추가
    formData.append("name", dogDetails.name);
    formData.append("sex", dogDetails.sex);
    formData.append("isNeutered", String(dogDetails.isNeutered)); // boolean 값을 문자열로 변환
    formData.append("breed", dogDetails.breed);
    formData.append("bod", dogDetails.bod); // 날짜 문자열 (e.g., "2023-12-01")

    const response = await axios.post(
      `${appConfig.apiUrl}api/dog/add`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    console.log("대답. ", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error, "postParentDog");
  }
};
