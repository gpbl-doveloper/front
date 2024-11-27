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
    // FormData 생성
    const formData = new FormData();

    // 사진 파일 추가
    photoUris.forEach((photoUri, index) => {
      const photoFile = {
        uri: photoUri, // 사진의 로컬 URI
        type: "image/jpeg", // MIME 타입 (jpg인 경우)
        name: `dog_photo_${index + 1}.jpg`, // 각 사진의 파일 이름
      };
      formData.append("photos", photoFile as any); // 서버에서 기대하는 배열 필드 이름 사용
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
