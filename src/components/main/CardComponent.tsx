import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CardComponentProps {
  CardComponentValue: { mainImageUri: string; iconImageUri: string }[];
}

function CardComponent({ CardComponentValue }: CardComponentProps) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.ImageContainer}>
        {/* 최대 4개의 카드 값을 가져옴 */}
        {CardComponentValue.map((value, index) => (
          <View style={styles.cardWrapper} key={index}>
            <CardImage uri={value.mainImageUri} />
          </View>
        ))}
      </View>

      {/* 자세히 보기 버튼 */}
      <TouchableOpacity style={styles.nextButton}>
        <Ionicons name="arrow-forward" size={24} color="white" />
      </TouchableOpacity>
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
});

export default CardComponent;

function CardImage({ uri }: { uri: string }) {
  return (
    <Image
      resizeMode="contain"
      source={require("../../assets/images/icon.png")}
      style={styles.mainImage}
    />
  );
}
