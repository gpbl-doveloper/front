import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
import { Href, router } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import { Diary, DiaryStore, useDiaryStore } from "@/src/store/diaryStore";

interface TodayCardComponentProps {
  todayDiary: Diary; // Diary 타입 지정
}

export function TodayCardComponent({ todayDiary }: TodayCardComponentProps) {
  console.log("todayDiary.files:", JSON.stringify(todayDiary, null, 2));

  return (
    <View style={styles.cardContainer}>
      <View style={styles.ImageContainer}>
        {!todayDiary || !todayDiary.files || todayDiary.files.length === 0 ? (
          <Text>일기가 없습니다.</Text>
        ) : (
          todayDiary.files.map((value, index) => (
            <View style={styles.cardWrapper} key={index}>
              <TodayCardImage uri={value.fileURL} />
            </View>
          ))
        )}
      </View>

      {/* 자세히 보기 버튼 */}
      <View style={styles.nextButton}>
        <Entypo
          name="chevron-right"
          size={24}
          color="white"
          onPress={() => router.push("/diary" as Href)}
        />
      </View>
    </View>
  );
}

function TodayCardImage({ uri }: { uri: string }) {
  return (
    <Image resizeMode="contain" source={{ uri }} style={styles.mainImage} />
  );
}

export function HistoryComponent({
  historyValue,
  url,
}: {
  historyValue: Diary[];
  url: string;
}) {
  return (
    <View style={styles.historyCardContainer}>
      {historyValue.map((value: any, index: number) => (
        <View key={index} style={styles.historyCard}>
          <Image source={value.mainImageUri} style={styles.historyImage} />
          <View>
            <Text style={styles.historyText}>
              Date : {value.createdAt?.slice(0, 10) || "2024-00-00"}
            </Text>
            <Text style={styles.historyText}>
              Teacher: {value.authorId || "teacher1"}
            </Text>
          </View>
          <View style={styles.historyNextButton}>
            <Pressable onPress={() => router.push(`/${url}` as Href)}>
              <Entypo name="chevron-right" size={24} color="white" />
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
}

// 가로로 스크롤되는 이미지 갤러리
export function HorizontalImageGallery({ imageData }: { imageData: any }) {
  return (
    <ScrollView style={styles.imageGallery} horizontal={true}>
      {imageData?.map((_data: any, index: React.Key | null | undefined) => (
        <View key={index} style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/icon.png")}
            style={styles.image}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    paddingRight: 12,
  },
  imageGallery: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#F4B2B0",
    padding: 15,
    borderRadius: 10,
    flexWrap: "nowrap",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#F4B2B0",
  },
  historyNextButton: {
    justifyContent: "center",
  },

  cardContainer: {
    padding: 16,
    margin: "auto",
    borderRadius: 15,
    backgroundColor: "#FCB3AD",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4, // 그림자 효과 (Android)
  },
  ImageContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 23,
  },
  cardWrapper: {
    width: 130,
    height: 130,
    backgroundColor: "#fff",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    padding: 10,
  },
  mainImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  nextButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    paddingTop: 20,
  },

  historyCardContainer: {
    gap: 16,
  },
  historyCard: {
    padding: 16,
    justifyContent: "space-between",
    borderRadius: 15,
    gap: 16,
    flexDirection: "row",
    backgroundColor: "#FCB3AD",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4, // 그림자 효과 (Android)
  },
  historyImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  historyText: {
    fontSize: 16,
    paddingVertical: 6,
    maxWidth: 145,
  },
});
