import { getCenterTodayPicture } from "@/src/apis/apiPictures/get";
import { postPicture } from "@/src/apis/apiPictures/post";
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

    return response;
  } catch (error) {
    console.error("Error uploading photos:", error);
  }
};

export const getPhotosAPI = async (idToken: string, date: string) => {
  try {
    const response = await getCenterTodayPicture(idToken, date);
    return response;
  } catch (error) {
    console.error("Error getting photos:", error);
  }
};
