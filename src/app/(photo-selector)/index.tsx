import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "expo-router";
import { Header2Buttons } from "@/src/components/Header";
import { PhotoList } from "./PhotoList";
import { usePhotoStore } from "@/src/store/photoStore";
import { getPhotos, postPictures, requestPermission } from "./photoModel";
import { useUserStore } from "@/src/store/userStore";

export default function PhotoSelector() {
  const navigator = useNavigation();
  // 가져온 사진
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  // 선택된 사진
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

  // 보낸 사진 저장한 전역변수 (나중에 이거에 해당하는애들은 칠해줌)
  const { sendedPhotos, setSendedPhotos } = usePhotoStore();
  const { user } = useUserStore();

  //오늘 찍은 사진들만 가져오는 함수
  const getTodayPhotos = async () => {
    // 미디어 권한 요청
    requestPermission();

    // 오늘 찍은 사진들만 가져오기
    const assets = await getPhotos();

    // URI 변환을 위한 함수
    //가져온 사진(asset)들에 대해 추가적인 정보(localUri)를 불러와서 사용
    const assetInfoPromises = assets.assets.map(async (asset) => {
      const assetInfo = await MediaLibrary.getAssetInfoAsync(asset); //getAssetInfoAsync() -> 개별 asset에 대한 추가적인 정보를 가져오는 함수
      return { ...asset, uri: assetInfo.localUri || asset.uri }; // localUri 사용, 없으면 기본 uri 사용
    });

    const updatedAssets = await Promise.all(assetInfoPromises);
    setPhotos(updatedAssets); // 변환된 URI 저장
  };

  const toggleSelectPhoto = (id: string) => {
    setSelectedPhotos((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((photoId) => photoId !== id)
        : [...prevSelected, id]
    );
  };

  // Upload 버튼 클릭 시 선택된 사진 전역변수에 저장 후 뒤로가기
  const handleRightButtonPress = async () => {
    try {
      if (!user) {
        console.error("User is not available.");
        return;
      }

      const idToken = user.uid;
      console.log("selectedPhotos", selectedPhotos);

      // 사진 업로드 호출
      const response = await postPictures({ idToken, selectedPhotos });
      console.log("Photos uploaded successfully:", response);

      // 업로드된 사진을 전역 상태에 저장
      setSendedPhotos(selectedPhotos);
    } catch (error) {
      console.error("Error in handleRightButtonPress:", error);
      alert("Failed to upload photos. Please try again.");
    }
  };

  useEffect(() => {
    getTodayPhotos();
  }, []);

  return (
    <View style={styles.container}>
      <Header2Buttons
        onCancel={() => navigator.goBack()}
        onDone={handleRightButtonPress}
      />

      {photos.length === 0 ? (
        <Text style={styles.errorText}>No photos found for today.</Text>
      ) : (
        <PhotoList
          photos={photos}
          selectedPhotos={selectedPhotos}
          toggleSelectPhoto={toggleSelectPhoto}
        />
      )}
      <View style={styles.buttonContainer}>
        <Text style={styles.selectCountText}>
          Selected ({selectedPhotos.length})
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  selectCountText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 8,
    justifyContent: "space-between",
  },
  errorText: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    margin: 10,
  },
});
