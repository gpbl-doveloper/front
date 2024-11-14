import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DogForTeacherHomeList } from "@/src/store/dogStore";
import { useNavigation } from "expo-router";

interface DogItemProps {
  dog: DogForTeacherHomeList;
}

export function DogItem({ dog }: DogItemProps) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.dogItemContainer}
      onPress={() => navigation.navigate("DogDetail" as never)}
    >
      <DogImagePlaceholder />
      <View style={styles.dogInfo}>
        <Text style={styles.dogName}>{dog.name}</Text>
        <View style={styles.tasksStatusContainer}>
          <DogStatusInfo
            type="image"
            statusText={dog.isClassified ? "Classified" : "Not started"}
          />
          <DogStatusInfo
            type="document"
            statusText={dog.isDocumented ? "Documented" : "Not started"}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

// DogImagePlaceholder 컴포넌트
function DogImagePlaceholder() {
  return (
    <View style={styles.dogImageContainer}>
      <View style={styles.dogImagePlaceholder}>
        <Ionicons name="image-outline" size={30} color="#A3C0F7" />
      </View>
    </View>
  );
}

interface DogStatusInfoProps {
  type: "image" | "document"; // 아이콘 타입을 지정
  statusText: string;
}

function DogStatusInfo({ type, statusText }: DogStatusInfoProps) {
  const iconName = type === "image" ? "image-outline" : "document-outline";

  return (
    <View style={styles.statusContainer}>
      <Ionicons name={iconName} size={14} color="#A3A3A3" />
      <Text style={styles.dogStatus}>{statusText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  dogItemContainer: {
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#F3F7FF",
    marginBottom: 10,
    alignItems: "center",
    paddingRight: 16,
    height: 114,
  },
  dogImageContainer: {
    width: 100,
    height: 114,
    backgroundColor: "#E5EDFF",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  dogImagePlaceholder: {
    width: 40,
    height: 114,
    justifyContent: "center",
    alignItems: "center",
  },
  dogInfo: {
    flex: 1,
    paddingLeft: 18,
    gap: 12,
    justifyContent: "center",
  },
  dogName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tasksStatusContainer: {
    flexDirection: "column",
    gap: 6,
    paddingHorizontal: 4,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dogStatus: {
    color: "#A3A3A3",
    fontSize: 16,
    marginLeft: 6,
  },
});
