import axios from "axios";
import { AddDiaryState } from "../store/diaryStore";
import { requestMediaLibraryPermission } from "../utils/permissionUtils";
import { createDiaryFormData } from "../utils/formDataUtils";
import {
  postFormData,
  showErrorNotification,
  showSuccessNotification,
} from "../utils/apiUtils";
import { Alert } from "react-native";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api/";

// 알림장 목록 불러오기
export async function getAllDiaryList(): Promise<any> {
  try {
    const response = await axios.get("/diary/all", {
      baseURL: API_URL,
      headers: {
        // Authorization: `Bearer your-token`, // 필요한 경우 인증 토큰 추가
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      showErrorNotification(error, "Axios error:");
    } else {
      showErrorNotification(error, "Unknown error:");
    }
    throw error;
  }
}

// 특정 알림장 조회
export async function getDiaryListByID(id: string): Promise<any> {
  try {
    const response = await axios.get(`/diary/${id}`, {
      baseURL: API_URL,
      headers: {
        // Authorization: `Bearer your-token`, // 필요한 경우 인증 토큰 추가
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
    throw error;
  }
}
/// 다이어리 추가 함수
export const addDiary = async (diaryData: AddDiaryState) => {
  try {
    // 권한 요청
    const hasPermission = await requestMediaLibraryPermission();
    if (!hasPermission) return;

    // FormData 생성
    const formData = await createDiaryFormData(
      diaryData.inputDiaryContent,
      diaryData.inputDiaryFiles
    );

    // 백엔드로 POST 요청 전송
    const result = await postFormData(`${API_URL}/diary/add`, formData);

    showSuccessNotification("Diary uploaded successfully");
  } catch (error) {
    showErrorNotification(error, "Error uploading diary");
  }
};
