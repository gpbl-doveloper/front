import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { ParentHomeContainer } from "../parentHomeStyles";
import {
  ActivityCard,
  FeedingCard,
  NoDataCard,
  NoteCard,
  SleepCard,
} from "./parentDiaryView";
import CustomCarousel from "@/src/components/Carousel";
import { useNavigation } from "expo-router";
import { useSingleDiaryStore } from "@/src/store/diaryStore";
import { getDiaryAPI } from "./parentDiaryModel";
import { useFirebaseAuth } from "@/src/store/userStore";
import { useSelectedDogStore } from "@/src/store/dogStore";
import { useDiaryPhotoStore } from "@/src/store/photoStore";
import { ReservationDate } from "@/src/components/DatePicker";

export default function TodayScreen() {
  const navigation = useNavigation();
  const { diary, setDiary } = useSingleDiaryStore();
  const { idToken } = useFirebaseAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { selectedDog } = useSelectedDogStore();
  const { diaryPhotos, setDiaryPhotos } = useDiaryPhotoStore();

  const getDiary = async () => {
    try {
      if (!selectedDog) {
        setError("선택된 강아지가 없습니다.");
        return;
      }
      setIsLoading(true);
      setError(null);
      const getDiaryResult = await getDiaryAPI({
        dogId: selectedDog.id,
        idToken: idToken,
      });
      console.log("getDiaryResult : ", getDiaryResult);
      return getDiaryResult;
    } catch (error) {
      setError("다이어리를 불러오는데 실패했습니다.");
      console.error("Diary fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (idToken) {
      getDiary().then((result) => {
        if (result?.data?.diaryNote) {
          setDiary(result.data.diaryNote);
          console.log("diary : ", result);
        }
      });
    }
  }, []);

  return (
    <ParentHomeContainer>
      <ReservationDate>
        <TouchableOpacity
          onPress={() => navigation.navigate("/(dog-profile)/index" as never)}
        >
          <Image
            source={{ uri: selectedDog?.img }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </ReservationDate>

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : !diary && !diaryPhotos.length ? (
        <NoDataCard text="No data for today" />
      ) : (
        <>
          <View style={styles.carouselView}>
            {diaryPhotos.length > 0 ? (
              <CustomCarousel />
            ) : (
              <NoDataCard text="Photo will be uploaded soon" />
            )}
          </View>
          {diary ? (
            <View style={styles.diaryCards}>
              <ActivityCard activities={diary.activities} />
              <SleepCard napStart={diary.napStart} napEnd={diary.napEnd} />
              <FeedingCard
                feedingTime={diary.feedingTime}
                feedingAmt={diary.feedingAmt}
              />
              <NoteCard note={diary.note} />
            </View>
          ) : (
            <NoDataCard text="Note will be uploaded soon" />
          )}
        </>
      )}
    </ParentHomeContainer>
  );
}

const styles = StyleSheet.create({
  carouselView: {
    marginVertical: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  diaryCards: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginTop: 20,
    gap: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
