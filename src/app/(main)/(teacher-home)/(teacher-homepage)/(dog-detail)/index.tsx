import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

export default function DogDetailScreen() {
  const navigation = useNavigation();
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
          <Text style={styles.dogName}>Chloe</Text>
          <Text style={styles.dogDetails}>2 years old, Retriever</Text>
          <View style={styles.medicineRow}>
            <Ionicons name="medkit" size={16} color="orange" />
            <Text style={styles.medicineText}> Medicine</Text>
            <Text style={styles.medicineInfo}> Peniciline (at 3pm)</Text>
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
        description={"5 Photos"}
        onPress={() => {
          console.log("누름");
          navigation.navigate("PhotoSelector" as never);
        }}
      />
      <InfoCard
        title={"Note"}
        description={"Draft"}
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
