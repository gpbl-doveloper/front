import * as MediaLibrary from "expo-media-library";

// 미디어 라이브러리 권한 요청 함수
export const requestPermission = async (): Promise<boolean> => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Media library access is required.");
      return false;
    }
    return true;
  };