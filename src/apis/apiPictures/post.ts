import axios from "axios";
import appConfig from "../utils/apiConfig";
import { handleApiError } from "../utils/errorHandler";

/**
 * [center] 오늘의 사진 올리기
 * @param idToken 인증 토큰
 * @param photoURIs 전송할 사진 URI 배열
 * @returns API 응답 데이터
 */
export const postPicture = async (idToken: string, photoURIs: string[]) => {
  const formData = new FormData();

  // FormData에 사진 배열 추가
  photoURIs.forEach((uri, index) => {
    formData.append("files", {
      uri,
      name: `photo_${index}.jpg`, // 파일 이름 추가
      type: "image/jpeg",
    } as any);
  });

  try {
    const response = await axios.post(
      `${appConfig.apiUrl}api/picture/upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Upload successful:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error, "postPicture");
  }
};
