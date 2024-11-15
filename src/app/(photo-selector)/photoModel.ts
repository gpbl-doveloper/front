import { postPicture } from "@/src/apis/apiPicture";
import * as MediaLibrary from "expo-media-library";

export const postPictures = async ({
  idToken,
  selectedPhotos,
}: {
  idToken: string;
  selectedPhotos: string[];
}) => {
  // 사진 업로드 함수
  try {
    const resolvePhotoUri = async (phUri: string) => {
      try {
        const assetInfo = await MediaLibrary.getAssetInfoAsync({ id: phUri });
        return assetInfo.localUri || phUri; // localUri가 없으면 원래 경로 유지
      } catch (error) {
        console.error("Error resolving photo URI:", error);
        throw error;
      }
    };

    // 변환된 경로 사용
    const resolvedPhotoURIs = await Promise.all(
      selectedPhotos.map((phUri) => resolvePhotoUri(phUri))
    );

    // 업로드 호출
    const response = await postPicture(idToken, resolvedPhotoURIs);

    console.log("selectedPhotos in photoModel : ", selectedPhotos);
    // const response = await postPicture(uId, selectedPhotos);
    console.log("response:", response);
    return response;
  } catch (error) {
    console.error("Error uploading photos:", error);
  }
};

// 미디어 라이브러리 권한 요청 함수
export const requestPermission = async (): Promise<boolean> => {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== "granted") {
    alert("Media library access is required.");
    return false;
  }
  return true;
};

export const getPhotos = async () => {
  // 오늘 날짜 가져오기 및 해당 사진들 가져오는 함수
  const startOfDay = new Date().setHours(-72000, 0, 0, 0); //3일 전 날짜, 0으로 변경 예정

  const assets = await MediaLibrary.getAssetsAsync({
    mediaType: "photo",
    createdAfter: startOfDay,
    sortBy: [["creationTime", false]],
  });
  return assets;
};
