import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { DogItem } from "../(teacher-home)/(teacher-homepage)/(main)/DogItem";

export default function DogProfileScreen() {
  return (
    <View style={styles.container}>
      {/* 상단 로고 */}
      <View style={styles.logoContainer}>
        <FontAwesome name="paw" size={50} color="#6D4C41" />
      </View>

      {/* 프로필 리스트 */}
      <View style={styles.profileList}>
        <ProfileCard />
        <ProfileCard />
        {/* 강아지 정보 불러올 수 있으면 여기다 저장 */}
        {/* <DogItem dog={} /> */}
      </View>

      {/* 프로필 추가 버튼 */}
      <TouchableOpacity style={styles.addProfileButton}>
        <FontAwesome name="plus-circle" size={24} color="#6D4C41" />
        <Text style={styles.addProfileText}>Add profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const ProfileCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.imagePlaceholder}>
        <FontAwesome name="picture-o" size={24} color="#BDBDBD" />
      </View>
      <Text style={styles.dogName}>Dog name</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7EB",
    alignItems: "center",
    paddingVertical: 20,
  },
  logoContainer: {
    marginBottom: 30,
  },
  profileList: {
    width: "90%",
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: "#BDBDBD",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  dogName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  addProfileButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  addProfileText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6D4C41",
    marginLeft: 8,
  },
});
