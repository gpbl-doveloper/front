import axios from "axios";
import appConfig from "../utils/apiConfig";
import { handleApiError } from "../utils/errorHandler";
import * as ImageManipulator from "expo-image-manipulator";

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
    // 이미지 변환 처리
    const processedPhotos = await Promise.all(
      photoUris.map(async (photoUri) => {
        const manipResult = await ImageManipulator.manipulateAsync(
          photoUri,
          [], // 추가적인 변환 작업이 필요하다면 여기에 추가
          {
            compress: 0.7, // 압축률 (0-1)
            format: ImageManipulator.SaveFormat.JPEG,
          }
        );
        return manipResult.uri;
      })
    );
    // FormData 생성
    const formData = new FormData();

    // 이미지 파일 추가
    // jpg 파일로 통일
    processedPhotos.forEach((photoUri, index) => {
      const originalFileName =
        photoUri.split("/").pop() || `dog_photo_${index + 1}`;
      formData.append("files", {
        uri: photoUri,
        name: originalFileName,
        type: "image/jpeg",
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
