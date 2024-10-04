// index.tsx
// main 화면의 index.tsx 파일입니다.
import "../../../../global.css";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Href, Stack, useRouter } from "expo-router";
import { IconBtn, IconTextBtn } from "@/src/components/main/Button";
import {
  HistoryComponent,
  TodayCardComponent,
} from "@/src/components/main/CardComponent";
import ReactLogo from "@/assets/images/icon.png";
import { ScrollView } from "react-native-gesture-handler";
import useUserStore from "@/src/store/userStore";
import { DogNameAndMedicine } from "../component/components";

export default function MainScreen() {
  const router = useRouter();
  const user = useUserStore((state) => state.user); // 타입 자동 추론 (User | null)

  const [todayCardComponentValue, setTodayCardComponentValue] = React.useState([
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
        <Text style={styles.titleText}>
          Hello, {user ? user.email : "Guest"} 🐾
        </Text>

        <DogNameAndMedicine />
      </View>

      {/* Today 메뉴 */}
      <View style={styles.subContentContainer}>
        <Text style={styles.subTitleText}>Today</Text>

        <TodayCardComponent todayCardComponentValue={todayCardComponentValue} />
      </View>

      {/* History 메뉴 */}
      <View style={styles.subContentContainer}>
        <Text style={styles.subTitleText}>History</Text>
        {/* 추후 url 수정 예정, 이전 알림장들 링크로 가야됨 (diary/숫자) */}
        <HistoryComponent historyValue={historyValue} url={"diary"} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
  },
  mainContainer: {
    display: "flex",
    padding: 16,
    gap: 24, //이거 적용 안됨
    flexGrow: 1,
  },
  subTitleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 16,
    paddingHorizontal: 6,
  },
  subContentContainer: {
    paddingHorizontal: 8,
    paddingBottom: 32,
  },
});
