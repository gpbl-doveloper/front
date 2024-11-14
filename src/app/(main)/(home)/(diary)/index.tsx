import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { ParentHomeContainer } from "../parentHomeStyles";
import { ReservationDate } from "../../(teacher-home)/(reservation)/reservationView";
import { cardData, DiaryCards } from "./parentDiaryView";
import CustomCarousel from "@/src/components/Carousel";
import { useNavigation } from "expo-router";

export default function TodayScreen() {
  const navigation = useNavigation();
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
        {cardData.map((card) => (
          <DiaryCards
            key={card.id}
            id={card.id}
            subtitle={card.hasSubTitle ? "subtitle" : undefined}
            description="description"
          />
        ))}
      </View>
      {/* <Text style={styles.noteText}>Today's Note</Text> */}
    </ParentHomeContainer>
  );
}

const styles = StyleSheet.create({
  carouselView: {
    marginVertical: 20,
  },
  diaryCards: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginTop: 20,
    gap: 20,
  },

  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
