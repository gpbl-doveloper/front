import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function ProfilePage() {
  return (
    <View style={styles.container}>
      {/* 프로필 이미지 및 수정 아이콘 */}
      <View style={styles.imageContainer}>
        <Image
          style={styles.profileImage}
          source={{
            uri: "https://via.placeholder.com/150", // 기본 프로필 이미지 URL
          }}
        />
        <TouchableOpacity style={styles.editIconContainer}>
          <Ionicons name="pencil" size={16} color="black" />
        </TouchableOpacity>
      </View>

      {/* 프로필 정보 */}
      <View style={styles.infoContainer}>
        <ProfileInfo label="Name" value="PBL A" />
        <ProfileInfo label="Username" value="Dovelopers" />
        <ProfileInfo label="Phone" value="+1 123 456 7890" />
        <ProfileInfo label="Email" value="name@domain.com" />
        <ProfileInfo
          label="Address"
          value={`400 Spectrum Center\nwework\nCA, Irvine , US`}
        />
      </View>

      {/* 로그아웃 버튼 */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Sign out</Text>
      </TouchableOpacity>
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
    justifyContent: "space-between",
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
    backgroundColor: "#FF3B30",
    borderRadius: 10,
    paddingVertical: 15,
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