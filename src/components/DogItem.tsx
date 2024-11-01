import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Dog } from "../app/(main)/(teacher-home)/(teacher-homepage)/teacherHomePageModel";

interface DogItemProps {
  dog: Dog;
}

export const DogItem: React.FC<DogItemProps> = ({ dog }) => (
  <View style={styles.dogItemContainer}>
    <View style={styles.dogImageContainer}>
      <View style={styles.dogImagePlaceholder}>
        <Ionicons name="image-outline" size={30} color="#A3C0F7" />
      </View>
    </View>
    <View style={styles.dogInfo}>
      <Text style={styles.dogName}>{dog.name}</Text>
      <View style={styles.statusContainer}>
        <Ionicons name="image-outline" size={14} color="#A3A3A3" />
        <Text style={styles.dogStatus}>Not started</Text>
      </View>
      <View style={styles.statusContainer}>
        <Ionicons name="document-outline" size={14} color="#A3A3A3" />
        <Text style={styles.dogStatus}>Not started</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  dogItemContainer: {
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#F3F7FF",
    marginBottom: 10,
    alignItems: "center",
    paddingRight: 16,
    height: 100,

  },
  dogImageContainer: {
    width: 100, // 왼쪽 이미지 영역 너비 설정
    backgroundColor: "#E5EDFF",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  dogImagePlaceholder: {
    width: 40,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  dogInfo: {
    flex: 1,
    paddingLeft: 16,
    paddingVertical: 16,
  },
  dogName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  dogStatus: {
    color: "#A3A3A3",
    fontSize: 14,
    marginLeft: 6,
  },
});
