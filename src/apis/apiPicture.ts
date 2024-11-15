import Constants from "expo-constants";
import axios from "axios";

const appConfig = Constants.expoConfig?.extra;

if (!appConfig || !appConfig.apiUrl) {
  console.error("API_URL이 설정되지 않았습니다.");
  throw new Error("API_URL이 설정되지 않았습니다.");
}

/**
 * 사진 업로드 함수
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
    if (axios.isAxiosError(error)) {
      console.error(
        "Upload failed:",
        error.response?.status,
        error.response?.data
      );
    } else {
      console.error("Unknown error occurred:", error);
    }
    throw error;
  }
};

//사진 등록 함수
// export const postPicture = async (photoURIs: string[]) => {
//   try {
//     // 권한 요청
//     const hasPermission = await requestMediaLibraryPermission();
//     if (!hasPermission) return;

//     // FormData 생성
//     const formData = new FormData();

//     // FormData에 파일 추가
//     await addFilesToFormData(photoURIs, formData);
//     console.log("FormData:", formData.getAll("files"));

//     // 백엔드로 POST 요청을 통해 이미지 배열 전송
//     const result = postFormData(`${API_URL}/picture/upload`, formData);

//     showSuccessNotification("All photos uploaded successfully");
//   } catch (error) {
//     showErrorNotification(error, "Error uploading photos");
//   }
// };

// //사진 가져오기 함수
// // export async function getTodayPicture(): Promise<any> {
// //   try {
// //     const response = await axios.get("/picture/all", {
// //       baseURL: API_URL,
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //     });
// //     return response.data;
// //   } catch (error) {
// //     if (axios.isAxiosError(error)) {
// //       console.error("Axios error:", error.message);
// //     } else {
// //       console.error("Unknown error:", error);
// //     }
// //     throw error;
// //   }
// // }
