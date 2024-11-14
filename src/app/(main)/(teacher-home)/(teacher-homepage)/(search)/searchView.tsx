import { SearchItem, useSearchStore } from "@/src/store/searchStore";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { DogItem } from "../(main)/DogItem";
import { DogForTeacherHomeList } from "@/src/store/dogStore";

export function SearchResult({
  filteredDogs,
}: {
  filteredDogs: DogForTeacherHomeList[];
}) {
  return (
    <FlatList
      data={filteredDogs}
      renderItem={({ item }) => <DogItem dog={item} />}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
    />
  );
}

export function SearchInputBar({
  searchText,
  setSearchText,
  handleSearchSubmit,
}: {
  searchText: string;
  setSearchText: (text: string) => void;
  handleSearchSubmit: () => void;
}) {
  const navigation = useNavigation();

  return (
    <View style={styles.searchHeader}>
      <TouchableOpacity
        style={styles.searchBackButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Dog name"
          placeholderTextColor="#A3A3A3"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearchSubmit} // 엔터 키 동작 설정
          returnKeyType="search" // 키보드에서 'search' 버튼 표시
        />
      </View>
    </View>
  );
}

export function RecentSearchesAndClear() {
  const { clearSearches } = useSearchStore();
  return (
    <View style={styles.recentSearchesContainer}>
      <Text style={styles.recentSearchesTitle}>Recent searches</Text>
      <TouchableOpacity
        style={styles.recentSearchesTitle}
        onPress={() => clearSearches()}
      >
        <Text>Clear</Text>
      </TouchableOpacity>
    </View>
  );
}

export function SearchData({
  item,
  setSearchText,
}: {
  item: SearchItem;
  setSearchText: (text: string) => void;
}) {
  const { removeSearch } = useSearchStore();
  return (
    <TouchableOpacity
      style={styles.searchItem}
      onPress={() => setSearchText(item.name)}
    >
      <Text style={styles.searchItemText}>{item.name}</Text>
      <TouchableOpacity
        style={styles.searchDeleteButton}
        onPress={() => removeSearch(item.id)}
      >
        <Ionicons name="close-circle-outline" size={20} color="#A3A3A3" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  searchHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 10,
  },
  searchBackButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FE",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  searchDeleteButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  searchInputContainer: {
    flex: 1,
  },
  recentSearchesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
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
    height: 50,
  },
  searchItemText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  listContainer: {
    flexGrow: 1,
    marginTop: 18,
  },
});
