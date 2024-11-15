import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker"; // 수정된 부분

export default function AddProfileScreen() {
  const [dogName, setDogName] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("Female");
  const [neuteringStatus, setNeuteringStatus] = useState("Done");

  return (
    <View style={styles.container}>
      {/* 페이지 제목 */}
      <Text style={styles.headerText}>Add profile</Text>

      {/* 사진 추가 버튼 */}
      <View style={styles.photoSection}>
        <Text style={styles.photoText}>Add 10+ photos of your dog</Text>
        <TouchableOpacity style={styles.photoButton}>
          <FontAwesome name="camera" size={20} color="#FFF7EB" />
        </TouchableOpacity>
      </View>

      {/* 개 이름 입력 */}
      <Text style={styles.label}>Dog name</Text>
      <TextInput
        style={styles.input}
        placeholder="Value"
        value={dogName}
        onChangeText={setDogName}
      />

      {/* 품종 입력 */}
      <Text style={styles.label}>Breed</Text>
      <TextInput
        style={styles.input}
        placeholder="Value"
        value={breed}
        onChangeText={setBreed}
      />

      {/* 성별 선택 */}
      <Text style={styles.label}>Gender</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Male" value="Male" />
        </Picker>
      </View>

      {/* 중성화 여부 선택 */}
      <Text style={styles.label}>Neutering</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={neuteringStatus}
          onValueChange={(itemValue) => setNeuteringStatus(itemValue)}
        >
          <Picker.Item label="Done" value="Done" />
          <Picker.Item label="Not Done" value="Not Done" />
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7EB",
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  photoSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  photoText: {
    fontSize: 16,
    marginRight: 10,
  },
  photoButton: {
    width: 40,
    height: 40,
    backgroundColor: "#6D4C41",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  pickerContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
});
