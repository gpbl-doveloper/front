import React, { useState, useEffect } from "react";
import { View, Alert, StyleSheet, Text } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useRouter } from "expo-router";
import { uploadPicture } from "@/src/apis/apiPicture";
import { PhotoList } from "@/src/components/photoGallery/PhotoList";
import { ActionButton } from "@/src/components/photoGallery/ActionButton";

export default function PhotoGallery() {
  const router = useRouter();

  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  const [buttonText, setButtonText] = useState("Auto Select");
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

  //오늘 찍은 사진들만 가져오는 함수
  const getTodayPhotos = async () => {
    // 미디어 권한 요청
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Media library permission is required");
      return;
    }

    // 오늘 날짜 가져오기 및 해당 사진들 가져오는 함수
    const startOfDay = new Date().setHours(-72, 0, 0, 0); //3일 전 날짜, 나중에 삭제

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

  // 오늘 찍은 사진 가져오기
  useEffect(() => {
    getTodayPhotos();
  }, []);

  // 버튼 눌렀을 시 사진 업로드
  const handleButtonPress = () => {
    setButtonText("Upload");
    if (buttonText === "Upload") {
      if (selectedPhotos.length === 0) {
        Alert.alert("No photos selected");
        return;
      } else {
        uploadPicture(selectedPhotos);
        Alert.alert("Photos uploaded successfully");
        router.push("/teacher-home");
      }
    }
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
        <ActionButton
          text="Cancel"
          onPress={() => router.back()}
          style={styles.leftButton}
          textStyle={styles.leftButtonText}
        />
        <ActionButton
          text={buttonText}
          onPress={handleButtonPress}
          style={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    justifyContent: "space-between",
    paddingHorizontal: 20,
    margin: 10,
  },
  leftButton: {
    backgroundColor: "#CED4DA",
  },
  leftButtonText: {
    color: "black",
  },
  button: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    color: "white",
  },
});
