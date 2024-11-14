import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { StatusFilter } from "@/src/components/FilterBar";

function ProfilePage() {
  const [status, setStatus] = useState<"Dog" | "Parent">("Dog");
  return (
    <View style={styles.container}>
      {/* 프로필 이미지 및 수정 아이콘 */}
      <View style={styles.imageContainer}>
        <Image
          style={styles.profileImage}
          source={{
            uri: "https://picsum.photos/seed/picsum/200/300", // 기본 프로필 이미지 URL
          }}
        />
      </View>

      {/* 프로필 정보 */}
      <StatusFilter
        statusOptions={["Dog", "Parent"]}
        onStatusChange={setStatus}
      />
      {status === "Dog" ? (
        <View style={styles.infoContainer}>
          <ProfileInfo label="Medication" value="Peniciline (at 3pm)" />
          <ProfileInfo label="Name" value="Chloe" />
          <ProfileInfo label="Gender" value="boy" />
          <ProfileInfo label="Breed" value="Ritriever" />
          <ProfileInfo label="Nuetering" value="Done" />
        </View>
      ) : (
        <View style={styles.infoContainer}>
          <ProfileInfo label="Name" value="AAA" />
          <ProfileInfo label="Center" value="CenterName" />
          <ProfileInfo label="Phone" value="+123 456 789" />
          <ProfileInfo label="Email" value="name@mdm.com" />
        </View>
      )}
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
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 50,
    alignItems: "center",
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
  logoutButton: {
    backgroundColor: "#000000",
    borderRadius: 100,
    paddingVertical: 12,
    paddingHorizontal: 100,
    marginBottom: 30,
    width: "90%",
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default ProfilePage;
