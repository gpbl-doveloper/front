import * as MediaLibrary from "expo-media-library";

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
