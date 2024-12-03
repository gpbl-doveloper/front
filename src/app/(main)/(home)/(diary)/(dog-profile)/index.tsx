import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ButtonBigSize, ButtonCircleShape } from "@/src/components/Buttons";
import { useSelectedDogStore } from "@/src/store/dogStore";
import { useFirebaseAuth } from "@/src/store/userStore";
import { editDogProfileAPI } from "./dogProfileModel";

function ProfilePage() {
  const { selectedDog, setSelectedDog } = useSelectedDogStore();
  const { idToken } = useFirebaseAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedDog, setEditedDog] = useState(selectedDog);

  if (selectedDog === null) {
    return null;
  }
  const handleSave = () => {
    if (editedDog) {
      editDogProfileAPI(idToken, selectedDog.id, editedDog);
      setSelectedDog(editedDog);
      setIsEditing(false);
    }
  };

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
        <ProfileInfo
          label="Medication"
          value={isEditing ? editedDog?.medication : selectedDog.medication}
          isEditing={isEditing}
          onChangeText={(text) =>
            editedDog && setEditedDog({ ...editedDog, medication: text })
          }
        />
        <ProfileInfo
          label="Name"
          value={isEditing ? editedDog?.name : selectedDog.name}
          isEditing={isEditing}
          onChangeText={(text) =>
            editedDog && setEditedDog({ ...editedDog, name: text })
          }
        />
        <ProfileInfo
          label="Gender"
          value={isEditing ? editedDog?.sex : selectedDog.sex}
          isEditing={isEditing}
          onChangeText={(text) =>
            editedDog && setEditedDog({ ...editedDog, sex: text })
          }
        />
        <ProfileInfo
          label="Breed"
          value={isEditing ? editedDog?.breed : selectedDog.breed}
          isEditing={isEditing}
          onChangeText={(text) =>
            editedDog && setEditedDog({ ...editedDog, breed: text })
          }
        />
        <ProfileInfo
          label="Neutering"
          value={
            isEditing
              ? editedDog?.isNeutered
                ? "Done"
                : "Not Yet"
              : selectedDog.isNeutered
              ? "Done"
              : "Not Yet"
          }
          isEditing={isEditing}
          onChangeText={(text) =>
            editedDog &&
            setEditedDog({
              ...editedDog,
              isNeutered: text.toLowerCase() === "done",
            })
          }
        />
      </View>

      <View style={styles.buttonContainer}>
        {/* 정보 수정 버튼 */}
        <ButtonBigSize
          text={isEditing ? "Save" : "Edit"}
          buttonColor="whiteBlack"
          onPress={() => {
            if (isEditing) {
              handleSave();
            } else {
              setIsEditing(true);
            }
          }}
        />
      </View>
    </View>
  );
}

function ProfileInfo({
  label,
  value,
  isEditing,
  onChangeText,
}: {
  label: string;
  value: string | undefined;
  isEditing?: boolean;
  onChangeText?: (text: string) => void;
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
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    padding: 5,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
    gap: 12,
  },
});

export default ProfilePage;
