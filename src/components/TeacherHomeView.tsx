// 구식 코드
// 현재는 index.tsx 파일로 대체됨

import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import React from "react";
import { useUserStore } from "@/src/store/userStore";
import { DogNameAndMedicine } from "@/src/components/components";

export default function TeacherHome() {
  const user = useUserStore((state) => state.user);

  return (
    <ScrollView style={styles.mainContainer}>
      <View>
        <Text style={styles.titleText}>
          Hello, {user ? user.email : "Teacher"} 🐾
        </Text>
        <DogNameAndMedicine userRole="teacher" />
      </View>
      <View style={styles.subContentContainer}>
        <Text style={styles.subTitleText}>Today</Text>
        {/* VerticalList 수정 후 이부분도 수정 */}
        {/* <VerticalList dataList={dogsData} url={"(write-diary)"} /> */}
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
    flex: 1,
    padding: 20,
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
