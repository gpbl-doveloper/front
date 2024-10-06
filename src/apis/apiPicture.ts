import * as FileSystem from "expo-file-system";
import axios from "axios";
import * as MediaLibrary from "expo-media-library";
import { Alert } from "react-native";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api/";

export const uploadPicture = async (photoURIs: string[]) => {
  try {
    // 권한 요청
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    // FormData 생성
    const formData = new FormData();

    // 선택된 사진 URI마다 Blob으로 변환하여 FormData에 추가
    for (let i = 0; i < photoURIs.length; i++) {
      const assetId = photoURIs[i];

      // MediaLibrary에서 파일 정보 가져오기
      const asset = await MediaLibrary.getAssetInfoAsync(assetId);

      // 파일 경로가 제대로 설정되었는지 확인 (localUri 또는 uri 사용)
      const fileUri = asset.localUri || asset.uri;

      if (!fileUri) {
        console.error("File URI not found for asset:", assetId);
        continue;
      }

      // 파일 경로를 이용해 파일의 blob 혹은 binary 데이터를 다룸
      const fileInfo = await FileSystem.getInfoAsync(fileUri);

      if (!fileInfo.exists) {
        console.error("File does not exist:", fileUri);
        continue;
      }

      const fileData = {
        uri: fileUri,
        type: asset.mediaType === "photo" ? "image/jpeg" : "image/png", // 파일 타입 설정
        name: asset.filename || `file-${i}.jpg`, // 파일 이름 설정
      };

      formData.append("files", fileData);
    }

    // FormData 내용 확인
    console.log("FormData:", formData.getAll("files"));

    // 백엔드로 POST 요청을 통해 이미지 배열 전송
    const result = await axios.post(`${API_URL}/picture/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("All photos uploaded successfully to the backend:", result);
    alert("All photos uploaded successfully");
  } catch (error) {
    console.error("Error uploading photos to the backend:", error);
    alert("Error uploading photos");
  }
};

// //사진 업로드
// export async function uploadPicture(data: any): Promise<any> {
//   try {
//     const response = await axios.post("/picture/upload", {
//       baseURL: API_URL,
//       headers: {
//         // Authorization: `Bearer your-token`, // 필요한 경우 인증 토큰 추가
//         "Content-Type": "application/json",
//       },
//       data,
//     });
//     // 응답 데이터 처리
//     return response.data;
//   } catch (error) {
//     // 오류 처리
//     if (axios.isAxiosError(error)) {
//       console.error("Axios error:", error.message);
//     } else {
//       console.error("Unknown error:", error);
//     }
//     throw error; // 필요에 따라 오류를 던져서 상위 호출부에서 처리
//   }
// }

export async function getTodayPicture(): Promise<any> {
  try {
    const response = await axios.get("/picture/all", {
      baseURL: API_URL,
      headers: {
        // Authorization
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
