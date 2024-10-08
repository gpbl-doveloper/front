import * as FileSystem from "expo-file-system";
import axios from "axios";
import * as MediaLibrary from "expo-media-library";
import { Alert } from "react-native";
import { requestMediaLibraryPermission } from "../utils/permissionUtils";
import {
  postFormData,
  showErrorNotification,
  showSuccessNotification,
} from "../utils/apiUtils";
import { addFilesToFormData } from "../utils/formDataUtils";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api/";

//사진 등록 함수
export const uploadPicture = async (photoURIs: string[]) => {
  try {
    // 권한 요청
    const hasPermission = await requestMediaLibraryPermission();
    if (!hasPermission) return;

    // FormData 생성
    const formData = new FormData();

    // FormData에 파일 추가
    await addFilesToFormData(photoURIs, formData);
    console.log("FormData:", formData.getAll("files"));

    // 백엔드로 POST 요청을 통해 이미지 배열 전송
    const result = postFormData(`${API_URL}/picture/upload`, formData);

    showSuccessNotification("All photos uploaded successfully");
  } catch (error) {
    showErrorNotification(error, "Error uploading photos");
  }
};

//사진 가져오기 함수
// export async function getTodayPicture(): Promise<any> {
//   try {
//     const response = await axios.get("/picture/all", {
//       baseURL: API_URL,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error("Axios error:", error.message);
//     } else {
//       console.error("Unknown error:", error);
//     }
//     throw error;
//   }
// }
