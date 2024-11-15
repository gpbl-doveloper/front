import { FontAwesome } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";

const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

// 활동 카드 컴포넌트
export const ActivityCard = ({ activities }: any) => (
  <View style={styles.diaryCardContainer}>
    <FontAwesome name="paw" size={24} color="black" />
    <Text style={styles.diaryCardTitle}>Activities</Text>
    <Text style={styles.diaryCardDetail}>{activities}</Text>
  </View>
);

// 수면 카드 컴포넌트
export const SleepCard = ({ napStart, napEnd }: any) => (
  <View style={styles.diaryCardContainer}>
    <FontAwesome name="bed" size={24} color="black" />
    <Text style={styles.diaryCardTitle}>Sleep</Text>
    <Text style={styles.diaryCardDetail}>
      {`Took a nap from ${formatTime(napStart)} to ${formatTime(napEnd)}`}
    </Text>
  </View>
);

// 급식 카드 컴포넌트
export const FeedingCard = ({ feedingTime, feedingAmt }: any) => (
  <View style={styles.diaryCardContainer}>
    <FontAwesome name="cutlery" size={24} color="black" />
    <Text style={styles.diaryCardTitle}>Feeding</Text>
    <Text style={styles.diaryCardDetail}>
      {`Had ${feedingTime} meal(s). Ate ${feedingAmt.toLowerCase()} of the food given.`}
    </Text>
  </View>
);

// 추가 메모 카드 컴포넌트
export const NoteCard = ({ note }: any) => (
  <View style={styles.diaryCardContainer}>
    <FontAwesome name="sticky-note" size={24} color="black" />
    <Text style={styles.diaryCardTitle}>Additional Notes</Text>
    <Text style={styles.diaryCardDetail}>{note}</Text>
  </View>
);

const styles = StyleSheet.create({
  diaryCardTitles: {
    gap: 10,
  },
  diaryCardTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  diaryCardContainer: {
    width: "90%",
    borderWidth: 1,
    borderColor: "black",
    padding: 24,
    borderRadius: 12,
    gap: 24,
  },
  diaryCardPicText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  diaryCardDetail: {
    paddingHorizontal: 10,
    gap: 10,
  },

  cardPhotoImage: {
    width: 36,
    height: 36,
    borderRadius: 20,
  },
  photoContainer: {
    height: 300,
    marginHorizontal: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
