import { IconTextBtn } from "@/src/components/main/Button";
import { HorizontalImageGallery } from "@/src/components/main/CardComponent";
import { useSingleDiaryStore } from "@/src/store/diaryStore";
import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

export default function DiaryScreen() {
  const diary = useSingleDiaryStore((state) => state.diary);
  const fileURLList = diary.files.map((file) => file.fileURL);

  return (
    <ScrollView style={styles.content}>
      {/* Teacher Name */}
      <Text style={styles.teacherName}>
        Teacher: {diary.authorId || "센세이름"}
      </Text>

      <HorizontalImageGallery imageData={fileURLList} />

      {/* Dog Card */}
      <View style={styles.dogCard}>
        <View style={styles.dogNameFaceContainer}>
          <View style={styles.dogFaceIcon}>
            <FontAwesome6 name="dog" size={24} color="black" />
          </View>
          <Text style={styles.dogName}>{diary.dogId || "Wobbuffet"}</Text>
        </View>

        <Text style={styles.message}>{diary.content}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
  header: {
    backgroundColor: "#F4B2B0",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    padding: 20,
  },
  teacherName: {
    fontSize: 24,
    marginBottom: 20,
  },
  dogNameFaceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dogFaceIcon: {
    backgroundColor: "#fff",
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  dogCard: {
    backgroundColor: "#F4B2B0",
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 20,
    minHeight: 250,
    gap: 10,
  },
  dogName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    backgroundColor: "#F4B2B0",
  },
  navItem: {
    fontSize: 18,
    color: "#fff",
  },
});
