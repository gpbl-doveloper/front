import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { router, useNavigation } from "expo-router";
import { PhotoList } from "@/src/components/photoGallery/PhotoList";
import { useAddDiaryStore } from "@/src/store/diaryStore";
import { Header2Buttons } from "@/src/components/Header";

export default function PhotoSelector() {
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const navigator = useNavigation();

  //사진 저장할 전역변수
  const { setInputDiaryFiles } = useAddDiaryStore();

  //오늘 찍은 사진들만 가져오는 함수
  const getTodayPhotos = async () => {
    // 미디어 권한 요청
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Media library permission is required");
      return;
    }

    // 오늘 날짜 가져오기 및 해당 사진들 가져오는 함수
    const startOfDay = new Date().setHours(-720, 0, 0, 0); //3일 전 날짜, 0으로 변경 예정

    // 오늘 찍은 사진들만 가져오기
    const assets = await MediaLibrary.getAssetsAsync({
      mediaType: "photo",
      createdAfter: startOfDay,
      sortBy: [["creationTime", false]],
    });

    // URI 변환을 위한 함수
    const assetInfoPromises = assets.assets.map(async (asset) => {
      const assetInfo = await MediaLibrary.getAssetInfoAsync(asset);
      return { ...asset, uri: assetInfo.localUri || asset.uri }; // localUri 사용, 없으면 기본 uri 사용
    });

    const updatedAssets = await Promise.all(assetInfoPromises);
    setPhotos(updatedAssets); // 변환된 URI 저장
  };

  useEffect(() => {
    getTodayPhotos();
  }, []);

  // 오른쪽 버튼 클릭 시 선택된 사진 전역변수에 저장 후 뒤로가기
  const handleRightButtonPress = () => {
    setInputDiaryFiles(selectedPhotos);
    router.back();
  };

  const toggleSelectPhoto = (id: string) => {
    setSelectedPhotos((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((photoId) => photoId !== id)
        : [...prevSelected, id]
    );
  };

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
