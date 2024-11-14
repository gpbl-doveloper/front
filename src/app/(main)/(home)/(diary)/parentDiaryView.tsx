import { Image, StyleSheet, Text, View } from "react-native";

// 이거 데이터 들어오는거 보고 수정

interface InfoCardProps {
  id: number; // 카드 ID
  subtitle?: string; // 부제목 (선택사항)
  description: string; // 설명 텍스트
}

export function DiaryCards({ id, subtitle, description }: InfoCardProps) {
  const card = cardData.find((item) => item.id === id);
  if (!card) return null;
  return (
    <View style={styles.diaryCardContainer}>
      <View style={styles.diaryCardPicText}>
        <Image
          source={{ uri: "https://picsum.photos/seed/picsum/200/300" }}
          style={styles.cardPhotoImage}
        />
        <View style={styles.diaryCardTitles}>
          <Text style={styles.diaryCardTitle}>{card.title}</Text>
          {card.hasSubTitle && <Text>{subtitle}</Text>}
        </View>
      </View>

      <View style={styles.diaryCardDetail}>
        <Text>{description}</Text>
      </View>
    </View>
  );
}
export const cardData = [
  {
    id: 1,
    icon: { uri: "https://picsum.photos/seed/picsum/200/300" },
    title: "Activities",
    hasSubTitle: false,
  },
  {
    id: 2,
    icon: { uri: "https://picsum.photos/seed/picsum/200/300" },
    title: "Sleep",
    hasSubTitle: true,
  },
  {
    id: 3,
    icon: { uri: "https://picsum.photos/seed/picsum/200/300" },
    title: "Feeding",
    hasSubTitle: true,
  },
  {
    id: 4,
    icon: { uri: "https://picsum.photos/seed/picsum/200/300" },
    title: "Additional Notes",
    hasSubTitle: false,
  },
];

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
