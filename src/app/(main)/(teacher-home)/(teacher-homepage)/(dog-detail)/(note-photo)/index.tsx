import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "expo-router";
import { Header2Buttons } from "@/src/components/Header";
import { usePhotoStore } from "@/src/store/photoStore";
import { useFirebaseAuth } from "@/src/store/userStore";
import { PhotoList } from "@/src/components/photoSelector/PhotoList";
import {
  getPhotosAPI,
  postPictures,
} from "@/src/app/(photo-selector)/photoModel";
import { photoSelectorStyles } from "@/src/app/(photo-selector)/photoSelectorStyles";
import { sendPhotoAPI } from "./notePhotoModel";
import { useSingleDiaryStore } from "@/src/store/diaryStore";

export default function NotePhotoSelector() {
  const navigator = useNavigation();
  // 가져온 사진
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  // 선택된 사진
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  // 보낸 사진 저장한 전역변수 (나중에 이거에 해당하는애들은 칠해줌)
  const { sendedPhotos, setSendedPhotos } = usePhotoStore();
  const { idToken } = useFirebaseAuth();
  const { diary } = useSingleDiaryStore();
  if (!diary) {
    Alert.alert("Error", "Diary information not found");
    return;
  }

  // 선택된 사진들
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
      console.log("selectedPhotos : ", selectedPhotos);
      // 사진 업로드 호출
      const response = await sendPhotoAPI({
        idToken,
        diaryId: diary.id,
        pictureIds: selectedPhotos.map((photo) => parseInt(photo)),
      });

      // 업로드된 사진을 전역 상태에 저장
      setSendedPhotos(selectedPhotos);

      // 성공 알림 표시
      // Success alert
      Alert.alert("Upload Success", "Photos have been successfully sent.", [
        {
          text: "OK",
          onPress: () => navigator.goBack(),
        },
      ]);
    } catch (error) {
      console.error("Error in handleRightButtonPress:", error);
      Alert.alert("Upload Failed", "Failed to send photos. Please try again.");
    }
  };

  const photosToNote = async () => {
    const date = new Date().toISOString().split("T")[0];
    const photos = await getPhotosAPI(idToken, date);
    console.log("photos : ", photos.data.files);
    setPhotos(photos.data.files);
  };

  useEffect(() => {
    photosToNote();
  }, []);

  return (
    <View style={photoSelectorStyles.container}>
      <Header2Buttons
        onCancel={() => navigator.goBack()}
        onDone={handleRightButtonPress}
      />

      {photos.length === 0 ? (
        <Text style={photoSelectorStyles.errorText}>
          No photos found for today.
        </Text>
      ) : (
        <PhotoList
          photos={photos}
          selectedPhotos={selectedPhotos}
          toggleSelectPhoto={toggleSelectPhoto}
        />
      )}
      <View style={photoSelectorStyles.buttonContainer}>
        <Text style={photoSelectorStyles.selectCountText}>
          Selected ({selectedPhotos.length})
        </Text>
      </View>
    </View>
  );
}
