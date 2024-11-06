import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Href, router, useNavigation, useRouter } from "expo-router";
import {
  DOG_STATUS,
  type Dog,
  type DogStatus,
  getDogsByStatus,
  getStatusOptions,
} from "./teacherHomePageModel";
import { StatusFilter } from "@/src/components/statusFilter";
import { DogItem } from "@/src/components/DogItem";

export default function TeacherHomePage() {
  const [selectedStatus, setSelectedStatus] = useState<DogStatus>(
    DOG_STATUS.ALL
  );
  const [dogs, setDogs] = useState<Dog[]>([]);

  useEffect(() => {
    async function loadDogs() {
      try {
        const filteredDogs = await getDogsByStatus(selectedStatus);
        setDogs(filteredDogs);
      } catch (error) {
        console.error("Failed to fetch dogs:", error);
        // 에러 처리 (예: 에러 메시지 표시)
      }
    }

    loadDogs();
  }, [selectedStatus]);

  return (
    <View style={styles.container}>
      <SearchBar />

      <StatusFilter
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        statusOptions={getStatusOptions()}
      />

      <FlatList
        data={dogs}
        renderItem={({ item }) => <DogItem dog={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

function SearchBar() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.searchContainer}
      onPress={() => navigation.navigate("Search" as never)}
>
      <Ionicons
        name="search-outline"
        size={20}
        color="#A3A3A3"
        style={{ marginRight: 10 }}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Search By Name"
        placeholderTextColor="#D3D3D3"
        editable={false}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  listContainer: {
    flexGrow: 1,
    marginTop: 18,
  },
});
