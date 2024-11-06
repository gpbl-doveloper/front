import React from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const recentSearches = [
  { id: "1", name: "Coco" },
  { id: "2", name: "Kellan" },
  { id: "3", name: "Happy" },
];

export default function SearchPage() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* 검색창 */}
      <TouchableOpacity
        style={styles.searchContainer}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
        <TextInput
          style={styles.searchInput}
          placeholder="Dog name"
          placeholderTextColor="#D9D9D9"
        />
      </TouchableOpacity>

      {/* 최근 검색어 */}
      <Text style={styles.recentSearchesTitle}>Recent searches</Text>
      <FlatList
        data={recentSearches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.searchItem}>
            <Text style={styles.searchItemText}>{item.name}</Text>
            <TouchableOpacity>
              <Ionicons name="close-circle-outline" size={20} color="#A3A3A3" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F7FB",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: "#333333",
  },
  recentSearchesTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#A3A3A3",
    marginBottom: 10,
  },
  searchItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  searchItemText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
});
