import React, { useEffect } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { ParentHomeContainer } from "../parentHomeStyles";
import { ReservationDate } from "../../(teacher-home)/(reservation)/reservationView";
import {
  ActivityCard,
  FeedingCard,
  NoteCard,
  SleepCard,
} from "./parentDiaryView";
import CustomCarousel from "@/src/components/Carousel";
import { useNavigation } from "expo-router";
import { useSingleDiaryStore } from "@/src/store/diaryStore";
import { getDiaryfromAPI } from "./parentDiaryModel";
import { useFirebaseAuth } from "@/src/store/userStore";

export default function TodayScreen() {
  const navigation = useNavigation();
  const { diary, setDiary } = useSingleDiaryStore();
  const { idToken } = useFirebaseAuth();

  const getDiary = async () => {
    const getDiaryResult = await getDiaryfromAPI({
      dogId: 1,
      // date: "2024-11-15",
      idToken: idToken,
    });
    return getDiaryResult;
  };

  useEffect(() => {
    getDiary().then((result) => {
      setDiary(result.data.diaryNote);
      console.log("diary : ", result);
    });
  }, []);

  return (
    <ParentHomeContainer>
      <ReservationDate>
        <TouchableOpacity
          onPress={() => navigation.navigate("/(dog-profile)/index" as never)}
        >
          <Image
            source={{ uri: "https://picsum.photos/id/237/200/300" }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </ReservationDate>

      <View style={styles.carouselView}>
        <CustomCarousel />
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
        <Text>Today Diary is not found...</Text>
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
});
