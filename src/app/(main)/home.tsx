// index.tsx
// main 화면의 index.tsx 파일입니다.
import "../../../global.css";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Href, useRouter } from "expo-router";
import { IconBtn, IconTextBtn } from "@/src/components/main/Button";
import CardComponent from "@/src/components/main/CardComponent";
import ReactLogo from "../../assets/images/icon.png";
import { ScrollView } from "react-native-gesture-handler";

export default function MainScreen() {
  const router = useRouter();
  const [CardComponentValue, setCardComponentValue] = React.useState([
    { mainImageUri: ReactLogo, iconImageUri: "" },
    { mainImageUri: ReactLogo, iconImageUri: "" },
  ]);
  const [historyValue, setHistoryValue] = React.useState([
    { mainImageUri: ReactLogo, iconImageUri: "" },
    { mainImageUri: ReactLogo, iconImageUri: "" },
    { mainImageUri: ReactLogo, iconImageUri: "" },
    { mainImageUri: ReactLogo, iconImageUri: "" },
  ]);

  return (
    <ScrollView style={styles.mainContainer}>
      <View>
        <Text className="text-2xl">Hello, dusehd1 🐾</Text>

        {/* 상단 버튼, 강아지 이름 선택 및 약 아이콘 */}
        <View style={styles.btnContainer}>
          <IconTextBtn
            title="Dog Name"
            icon="dog"
            onPress={() => router.push("/" as Href)}
          />
          <IconBtn
            icon="medicinebox"
            onPress={() => router.push("/" as Href)}
          ></IconBtn>
        </View>
      </View>

      {/* Today 메뉴 */}
      <View style={styles.subContentContainer}>
        <Text style={styles.subTitleText}>Today</Text>

        <CardComponent CardComponentValue={CardComponentValue} />
      </View>

      {/* History 메뉴 */}
      <View style={styles.subContentContainer}>
        <Text style={styles.subTitleText}>History</Text>
        <HistoryComponent historyValue={historyValue} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    padding: 16,
    gap: 24,
    flexGrow: 1,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 11,
    marginTop: 16,
  },
  subTitleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 16,
    paddingHorizontal: 6,
  },
  subContentContainer: {
    paddingHorizontal: 8,
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

function HistoryComponent({ historyValue }: { historyValue: any }) {
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
