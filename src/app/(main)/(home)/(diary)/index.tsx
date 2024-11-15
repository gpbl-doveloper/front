import React from "react";
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

export default function TodayScreen() {
  const navigation = useNavigation();
  const { diary } = useSingleDiaryStore();
  return (
    <ParentHomeContainer>
      <ReservationDate>
        <TouchableOpacity
          onPress={() => navigation.navigate("/(dog-profile)/index" as never)}
        >
          <Image
            source={{ uri: "https://picsum.photos/seed/picsum/200/300" }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </ReservationDate>

      <View style={styles.carouselView}>
        <CustomCarousel />
      </View>
      <View style={styles.diaryCards}>
        <ActivityCard activities={diary.activities} />
        <SleepCard napStart={diary.napStart} napEnd={diary.napEnd} />
        <FeedingCard
          feedingTime={diary.feedingTime}
          feedingAmt={diary.feedingAmt}
        />
        <NoteCard note={diary.note} />
      </View>
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
