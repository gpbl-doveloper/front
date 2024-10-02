import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Href, router } from "expo-router";

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
        <Ionicons
          name="arrow-forward"
          size={24}
          color="white"
          onPress={() => router.push("/(main)/noticebook" as Href)}
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

export function HistoryComponent({ historyValue }: { historyValue: any }) {
  return (
    <View style={styles.historyCardContainer}>
      {historyValue.map((value: any, index: number) => (
        <View key={index} style={styles.historyCard}>
          <Image source={value.mainImageUri} style={styles.historyImage} />
          <Text style={styles.historyText}>뭔말쓸거임?</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
});
