import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { router } from "expo-router";
import { uploadPicture } from "@/src/apis/apiPicture";

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  const [buttonText, setButtonText] = useState("Auto Select"); // 버튼 텍스트 상태
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]); // 선택된 사진들을 저장

  const getTodayPhotos = async () => {
    // 권한 요청
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Media library permission is required");
      return;
    }

    // 오늘 날짜 가져오기
    // const startOfDay = new Date().setHours(0, 0, 0, 0);
    const startOfDay = new Date().setHours(-72, 0, 0, 0); //3일 전 날짜, 나중에 삭제

    // 오늘 찍은 사진들만 가져오기
    const assets = await MediaLibrary.getAssetsAsync({
      mediaType: "photo",
      createdAfter: startOfDay,
      sortBy: [["creationTime", false]], // 최신순 정렬
    });

    // URI 변환을 위한 추가 작업
    const assetInfoPromises = assets.assets.map(async (asset) => {
      const assetInfo = await MediaLibrary.getAssetInfoAsync(asset);
      return { ...asset, uri: assetInfo.localUri || asset.uri }; // localUri 사용, 없으면 기본 uri 사용
    });

    const updatedAssets = await Promise.all(assetInfoPromises);
    setPhotos(updatedAssets); // 변환된 URI 저장
  };

  useEffect(() => {
    getTodayPhotos(); // 컴포넌트가 로드되면 사진 불러오기
  }, []);

  const handleButtonPress = () => {
    setButtonText("Upload"); // 버튼 텍스트 변경

    if (buttonText === "Upload") {
      router.push("/teacher-home"); // 올바른 경로로 푸시
      // Alert.alert("Login Successful", ` ${selectedPhotos}`);
      uploadPicture(selectedPhotos);
      Alert.alert(`${selectedPhotos}`);
      console.log(selectedPhotos);
    }
  };

  const toggleSelectPhoto = (id: string) => {
    // 이미 선택된 사진이면 선택 해제, 아니면 선택 추가
    if (selectedPhotos.includes(id)) {
      setSelectedPhotos((prevSelected) =>
        prevSelected.filter((photoId) => photoId !== id)
      );
    } else {
      setSelectedPhotos((prevSelected) => [...prevSelected, id]);
    }
  };

  return (
    <View style={styles.container}>
      {photos.length === 0 ? (
        <Text>No photos found for today.</Text>
      ) : (
        <FlatList
          data={photos}
          keyExtractor={(item) => item.id}
          numColumns={3} // 한 줄에 3개의 아이템을 렌더링
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => toggleSelectPhoto(item.id)}>
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: item.uri }}
                  style={[
                    styles.image,
                    selectedPhotos.includes(item.id) && styles.selectedImage,
                  ]}
                />
                {selectedPhotos.includes(item.id) && (
                  <View style={styles.overlay} />
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
      {/* 하단에 "Auto Select" 버튼 */}
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: 110,
    height: 110,
    margin: 5,
    borderWidth: 2,
    borderColor: "transparent", // 기본 상태에서는 테두리가 없음
  },
  selectedImage: {
    borderColor: "pink", // 선택된 사진에 분홍색 테두리
    borderWidth: 4, // 테두리 굵기 증가
  },
  overlay: {
    position: "absolute",
    top: 5,
    left: 5,
    width: 110,
    height: 110,
    backgroundColor: "rgba(255, 192, 203, 0.5)", // 분홍색 반투명 오버레이
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    marginTop: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
