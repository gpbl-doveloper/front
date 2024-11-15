import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useSelectedDogStore } from "@/src/store/dogStore";

const calculateAge = (bod: string): number => {
  const birthDate = new Date(bod); // bod를 Date 객체로 변환
  const today = new Date(); // 현재 날짜

  let age = today.getFullYear() - birthDate.getFullYear(); // 연도 차이 계산
  const isBeforeBirthday =
    today.getMonth() < birthDate.getMonth() || // 현재 월이 생일 월보다 이전인지 확인
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate()); // 같은 월이면 생일이 지났는지 확인

  if (isBeforeBirthday) {
    age--; // 생일이 아직 오지 않았다면 나이에서 1 빼기
  }

  return age;
};

export default function DogDetailScreen() {
  const navigation = useNavigation();
  const { selectedDog } = useSelectedDogStore();
  if (selectedDog === null) {
    navigation.goBack();
    return null;
  }
  const diaryState = ["Not started", "Draft", "Sent"];

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="brown" />
      </TouchableOpacity>

      {/* Dog Info Card */}
      <View style={styles.infoCard}>
        <Image
          source={{ uri: "https://example.com/dog1.jpg" }}
          style={styles.dogImage}
        />
        <View style={styles.dogInfo}>
          <Text style={styles.dogName}>{selectedDog.name}</Text>
          <Text style={styles.dogDetails}>
            {calculateAge(selectedDog.bod)} years old, {selectedDog.breed}
          </Text>
          <View style={styles.medicineRow}>
            <Ionicons name="medkit" size={16} color="orange" />
            <Text style={styles.medicineText}> Medicine</Text>
            {selectedDog.medication === "" ? (
              <Text style={styles.medicineInfo}> - </Text>
            ) : (
              <Text style={styles.medicineInfo}> {selectedDog.medication}</Text>
            )}
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("DogProfile" as never)}
          >
            <Text style={styles.seeMoreText}>See more</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Today's Report */}
      <Text style={styles.reportTitle}>Today's report</Text>

      {/* Report Options */}
      <InfoCard
        title={"Photo"}
        description={`${selectedDog.photoLength} photos`}
        onPress={() => {
          navigation.navigate("PhotoSelector" as never);
        }}
      />
      <InfoCard
        title={"Note"}
        description={diaryState[selectedDog.diaryNoteStatus]}
        onPress={() => {
          navigation.navigate("WriteNote" as never);
        }}
      />
    </View>
  );
}

type InfoCardProps = {
  title: string;
  description: string;
  onPress: () => void;
};

function InfoCard({ title, description, onPress }: InfoCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{title}</Text>
        <Ionicons name="chevron-forward" size={18} color="#5C4033" />
      </View>
      <View style={styles.divider} />
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF4EE",
    padding: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  infoCard: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dogImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  dogInfo: {
    flex: 1,
  },
  dogName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3C3C3C",
  },
  dogDetails: {
    color: "#6B6B6B",
    fontSize: 14,
  },
  medicineRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  medicineText: {
    color: "#6B6B6B",
    fontSize: 14,
  },
  medicineInfo: {
    color: "#3C3C3C",
    fontSize: 14,
  },
  seeMoreText: {
    color: "brown",
    fontWeight: "bold",
    marginTop: 10,
  },
  divider: {
    borderBottomColor: "#DADADA",
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3C3C3C",
    marginBottom: 10,
  },
  reportContainer: {
    backgroundColor: "#FAF4EE",
  },
  reportOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  reportOptionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3C3C3C",
  },
  reportOptionSubText: {
    color: "#6B6B6B",
    fontSize: 14,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5C4033", // 짙은 갈색
  },
  description: {
    fontSize: 14,
    color: "#6B6B6B",
  },
});
