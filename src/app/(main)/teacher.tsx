import { HistoryComponent } from "@/src/components/main/CardComponent";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ReactLogo from "../../assets/images/icon.png";
import React from "react";

export default function TeacherHome() {
  const [dogsData, setDogsData] = React.useState([
    { mainImageUri: ReactLogo, iconImageUri: "" },
    { mainImageUri: ReactLogo, iconImageUri: "" },
  ]);
  return (
    <ScrollView style={styles.mainContainer}>
      <View>
        <Text style={styles.titleText}>Hello, Teacher Name🐾</Text>
      </View>
      <View style={styles.subContentContainer}>
        <Text style={styles.subTitleText}>Today</Text>
        <HistoryComponent historyValue={dogsData} url={"new-diary"} />
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
