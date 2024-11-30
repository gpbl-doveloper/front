import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

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
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
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
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: "#333333",
  },
});
