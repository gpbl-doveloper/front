import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "expo-router";
import { Header2Buttons } from "@/src/components/Header";
import {
  useCategorizedDogPhotoStore,
  useDiaryPhotoStore,
} from "@/src/store/photoStore";
import { useFirebaseAuth } from "@/src/store/userStore";
import { photoSelectorStyles } from "@/src/app/(photo-selector)/photoSelectorStyles";
import { sendPhotoAPI } from "./notePhotoModel";
import { PhotoList } from "./components/PhotoList";
import { showCustomAlert } from "@/src/components/alerts/dogDetailAlerts";
import { useSelectedDogStore } from "@/src/store/dogStore";

export default function NotePhotoSelector() {
  const navigator = useNavigation();
  const { idToken } = useFirebaseAuth();
  const { diaryPhotos } = useDiaryPhotoStore(); // 그날의 사진
  const { categorizedDogPhoto } = useCategorizedDogPhotoStore(); // 분류된 특정 강아지 사진
  const { selectedDog } = useSelectedDogStore();
  // 선택된 사진
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>(
    () => categorizedDogPhoto?.map(String) // ID가 숫자인 경우 문자열로 변환
  );

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
      // 사진 업로드 호출
      const response = await sendPhotoAPI({
        idToken,
        // @ts-ignore
        diaryPhotoId: selectedDog.diaryPhotoId,
        pictureIds: selectedPhotos.map((photo) => parseInt(photo)),
      });
      // Success alert
      showCustomAlert("success", "Photos have been successfully sent.", {
        onPress: () => navigator.goBack(),
      });
    } catch (error) {
      console.error("Error in handleRightButtonPress:", error);
      showCustomAlert("error", "Failed to send photos. Please try again.");
    }
  };

  return (
    <View style={photoSelectorStyles.container}>
      <Header2Buttons
        onCancel={() => navigator.goBack()}
        onDone={handleRightButtonPress}
      />

      {diaryPhotos.length === 0 ? (
        <Text style={photoSelectorStyles.errorText}>
          No photos found for today.
        </Text>
      ) : (
        <PhotoList
          photos={diaryPhotos}
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
