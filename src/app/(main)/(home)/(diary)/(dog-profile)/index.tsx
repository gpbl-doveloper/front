import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ButtonCircleShape } from "@/src/components/Buttons";
import { useSelectedDogStore } from "@/src/store/dogStore";
import { StatusFilter } from "@/src/components/FilterBar";

function ProfilePage() {
  const { selectedDog } = useSelectedDogStore();
  if (selectedDog === null) {
    return null;
  }
  return (
    <View style={styles.container}>
      {/* 프로필 이미지 및 수정 아이콘 */}
      <View style={styles.imageContainer}>
        <Image
          style={styles.profileImage}
          source={{
            uri: selectedDog.img || "https://picsum.photos/id/237/200/300",
          }}
        />
        <TouchableOpacity
          style={styles.editIconContainer}
          onPress={() => {
            // 이미지 편집 로직 추가
            console.log("Edit profile image");
          }}
        >
          <Ionicons name="pencil" size={16} color="black" />
        </TouchableOpacity>
      </View>

      {/* 프로필 정보 */}
      <View style={styles.infoContainer}>
        <ProfileInfo label="Medication" value={selectedDog.medication} />
        <ProfileInfo label="Name" value={selectedDog.name} />
        <ProfileInfo label="Gender" value={selectedDog.sex} />
        <ProfileInfo label="Breed" value={selectedDog.breed} />
        <ProfileInfo
          label="Nuetering"
          value={selectedDog.isNeutered ? "Done" : "Not Yet"}
        />
      </View>

      <View style={styles.buttonContainer}>
        {/* 정보 수정 버튼 */}
        <ButtonCircleShape
          text="Edit"
          buttonColor="whiteBlack"
          onPress={() => {
            // 프로필 편집 페이지로 이동
            console.log("Navigate to edit profile");
          }}
          width="100%"
        />
      </View>
    </View>
  );
}

// 프로필 정보 표시 컴포넌트
function ProfileInfo({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7E9",
    paddingHorizontal: 10,
    paddingTop: 50,
    alignItems: "center",
    gap: 12,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 20,
    alignItems: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#D3D3D3",
  },
  editIconContainer: {
    position: "absolute",
    bottom: 5,
    right: 5,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  infoContainer: {
    width: "100%",
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    width: "30%",
  },
  value: {
    fontSize: 16,
    color: "#666",
    width: "60%",
    flexWrap: "wrap",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
    gap: 12,
  },
});

export default ProfilePage;
