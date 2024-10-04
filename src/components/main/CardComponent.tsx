import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
import { Href, router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

interface TodayCardComponentProps {
  todayCardComponentValue: { mainImageUri: string; iconImageUri: string }[];
}

export function TodayCardComponent({
  todayCardComponentValue,
}: TodayCardComponentProps) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.ImageContainer}>
        {/* 최대 4개의 카드 값을 가져옴 */}
        {todayCardComponentValue.map((value, index) => (
          <View style={styles.cardWrapper} key={index}>
            <TodayCardImage uri={value.mainImageUri} />
          </View>
        ))}
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
    <Image
      resizeMode="contain"
      source={require("../../assets/images/icon.png")}
      style={styles.mainImage}
    />
  );
}

export function HistoryComponent({
  historyValue,
  url,
  text,
}: {
  historyValue: any;
  url: string;
  text?: string;
}) {
  return (
    <View style={styles.historyCardContainer}>
      {historyValue.map((value: any, index: number) => (
        <View key={index} style={styles.historyCard}>
          <Image source={value.mainImageUri} style={styles.historyImage} />
          <Text style={styles.historyText}>강아지 이름, 일기장 제목 등</Text>
          {/* <Text style={styles.historyText}>{text}</Text> */}
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

export function HorizontalImageGallery({ imageData }: { imageData: any }) {
  return (
    <ScrollView style={styles.imageGallery} horizontal={true}>
      {imageData.map((_data: any, index: React.Key | null | undefined) => (
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
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 23,
    margin: "auto",
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
