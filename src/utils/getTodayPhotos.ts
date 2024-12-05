import { getPhotos } from "./getTodayGallery";
import { requestPermission } from "./requestPermissionToGallery";
import * as MediaLibrary from "expo-media-library";

//오늘 찍은 사진들만 가져오는 함수
export const getTodayPhotos = async () => {
  // 미디어 권한 요청
  await requestPermission();

  // 오늘 찍은 사진들만 가져오기
  const assets = await getPhotos();

  // URI 변환을 위한 함수
  //가져온 사진(asset)들에 대해 추가적인 정보(localUri)를 불러와서 사용
  const assetInfoPromises = assets.assets.map(async (asset) => {
    const assetInfo = await MediaLibrary.getAssetInfoAsync(asset); //getAssetInfoAsync() -> 개별 asset에 대한 추가적인 정보를 가져오는 함수
    return { ...asset, uri: assetInfo.localUri || asset.uri }; // localUri 사용, 없으면 기본 uri 사용
  });

  // 가져온 사진들 photos에 저장해서 보여주기
  return await Promise.all(assetInfoPromises);
};
