import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useSelectedDogStore } from "@/src/store/dogStore";
import { useFirebaseAuth } from "@/src/store/userStore";
import { getDogDiaryAPI } from "./dogDetailModel";
import { useSingleDiaryStore } from "@/src/store/diaryStore";
import { calculateAge } from "./utils/calculateAge";
import { dogDetailStyles } from "./styles/dogDetailStyle";
import { TeacherHomeContainer } from "../../teacherHomeStyles";

export default function DogDetailScreen() {
  const navigation = useNavigation();
  const { selectedDog } = useSelectedDogStore();
  const { idToken } = useFirebaseAuth();
  const { setDiary, resetDiary } = useSingleDiaryStore();

  if (selectedDog === null) {
    navigation.goBack();
    return null;
  }

  const diaryState = ["Not started", "Draft", "Sent"];

  const handleGoBack = () => {
    resetDiary();
    navigation.goBack();
  };

  useEffect(() => {
    const fetchDogDetail = async () => {
      const result = await getDogDiaryAPI(idToken, selectedDog.id);
      if (result) {
        setDiary(result);
      } else {
        resetDiary();
      }
    };
    fetchDogDetail();
  }, [selectedDog.id]);

  return (
    <TeacherHomeContainer>
      {/* Back Button */}
      <TouchableOpacity
        style={dogDetailStyles.backButton}
        onPress={handleGoBack}
      >
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Dog Info Card */}
      <View style={dogDetailStyles.infoCard}>
        <Image
          source={{ uri: selectedDog.img }}
          style={dogDetailStyles.dogImage}
        />
        <View style={dogDetailStyles.dogInfo}>
          <Text style={dogDetailStyles.dogName}>{selectedDog.name}</Text>
          <Text style={dogDetailStyles.dogDetails}>
            {calculateAge(selectedDog.bod)} years old, {selectedDog.breed}
          </Text>
          <View style={dogDetailStyles.medicineRow}>
            <Ionicons name="medkit" size={16} color="orange" />
            <Text style={dogDetailStyles.medicineText}> Medicine</Text>
            {selectedDog.medication === "" ? (
              <Text style={dogDetailStyles.medicineInfo}> - </Text>
            ) : (
              <Text style={dogDetailStyles.medicineInfo}>
                {selectedDog.medication}
              </Text>
            )}
          </View>
          <View style={dogDetailStyles.seeMoreContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("DogProfile" as never)}
            >
              <Text style={dogDetailStyles.seeMoreText}>See more</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Divider */}
      <View style={dogDetailStyles.divider} />

      {/* Today's Report */}
      <Text style={dogDetailStyles.reportTitle}>Today's report</Text>

      {/* Report Options */}
      {/* 일단 돌아가니까 나중에 고치져 */}
      <InfoCard
        title={"Photo"}
        description={`${selectedDog.diaryPhotoStatus} photos`}
        onPress={() => {
          navigation.navigate("NotePhotoSelector");
        }}
      />
      <InfoCard
        title={"Note"}
        description={diaryState[selectedDog.diaryNoteStatus]}
        onPress={() => {
          navigation.navigate("WriteNote");
        }}
      />
    </TeacherHomeContainer>
  );
}

type InfoCardProps = {
  title: string;
  description: string;
  onPress: () => void;
};

function InfoCard({ title, description, onPress }: InfoCardProps) {
  return (
    <TouchableOpacity style={dogDetailStyles.card} onPress={onPress}>
      <View style={dogDetailStyles.cardContent}>
        <Text style={dogDetailStyles.title}>{title}</Text>
        <Ionicons name="chevron-forward" size={18} color="#5C4033" />
      </View>
      <View style={dogDetailStyles.divider} />
      <Text style={dogDetailStyles.description}>{description}</Text>
    </TouchableOpacity>
  );
}
