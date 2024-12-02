import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ButtonCircleShape } from "@/src/components/Buttons";
import { useFirebaseAuth, useUserStore } from "@/src/store/userStore";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@/global";
import { editProfileAPI } from "./profileModel";

function ProfilePage() {
  const { user, resetUser, setUser } = useUserStore();
  const { idToken } = useFirebaseAuth();
  const navigator = useNavigation<NavigationProp>();
  const [isEditing, setIsEditing] = useState(false);

  const [editingUser, setEditingUser] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
  });

  if (!user) return;

  // Alert 관련 상수 정의
  const PROFILE_ALERTS = {
    CONFIRM: {
      title: "Edit Profile",
      message: "Save the changes?",
      buttons: {
        cancel: "Cancel",
        confirm: "Save",
      },
    },
    RESULT: {
      success: {
        title: "Edit Complete",
        message: "The profile has been successfully modified.",
      },
      error: {
        title: "Error",
        message: "An error occurred while modifying the profile.",
      },
    },
  } as const;

  // 프로필 저장 로직
  const saveProfileChanges = async () => {
    try {
      const response = await editProfileAPI(idToken, editingUser);
      setUser({ ...user, ...editingUser });
      setIsEditing(false);

      Alert.alert(
        PROFILE_ALERTS.RESULT.success.title,
        PROFILE_ALERTS.RESULT.success.message
      );
    } catch (error) {
      console.error("Error updating user info:", error);
      Alert.alert(
        PROFILE_ALERTS.RESULT.error.title,
        PROFILE_ALERTS.RESULT.error.message
      );
    }
  };

  // 메인 핸들러
  const handleSave = () => {
    Alert.alert(PROFILE_ALERTS.CONFIRM.title, PROFILE_ALERTS.CONFIRM.message, [
      {
        text: PROFILE_ALERTS.CONFIRM.buttons.cancel,
        style: "cancel",
      },
      {
        text: PROFILE_ALERTS.CONFIRM.buttons.confirm,
        onPress: saveProfileChanges,
      },
    ]);
  };

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
        <ProfileInfo
          label="Name"
          value={editingUser.name}
          isEditing={isEditing}
          onChangeText={(text) => {
            setEditingUser({ ...editingUser, name: text });
          }}
        />
        <ProfileInfo
          label="Phone"
          value={editingUser.phone}
          isEditing={isEditing}
          onChangeText={(text) => {
            setEditingUser({ ...editingUser, phone: text });
          }}
        />
        <ProfileInfo
          label="Email"
          value={editingUser.email}
          isEditing={isEditing}
          onChangeText={(text) => {
            setEditingUser({ ...editingUser, email: text });
          }}
        />
      </View>

      {/* 로그아웃 버튼 */}
      <ButtonCircleShape
        text={isEditing ? "Save" : "Edit"}
        buttonColor="whiteBlack"
        onPress={() => {
          isEditing ? handleSave() : setIsEditing(true);
        }}
        width="100%"
      />
      <ButtonCircleShape
        text="Sign out"
        buttonColor="brown"
        onPress={() => {
          navigator.replace("index");
          resetUser();
        }}
        width="100%"
      />
    </View>
  );
}

// 프로필 정보 표시 컴포넌트
function ProfileInfo({
  label,
  value,
  isEditing,
  onChangeText,
}: {
  label: string;
  value: string;
  isEditing: boolean;
  onChangeText: (text: string) => void;
}) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      {isEditing ? (
        <TextInput
          style={[styles.value, styles.input]}
          value={value}
          onChangeText={onChangeText}
        />
      ) : (
        <Text style={styles.value}>{value}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf3e7", // 배경색
    paddingHorizontal: 10,
    paddingTop: 50,
    alignItems: "center",
    gap: 20,
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
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 5,
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
