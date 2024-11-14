import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export function SearchBarAndPictureButton() {
  return (
    <View style={mainStyles.searchAndPictureButtonContainer}>
      <SearchBar />
      <PictureButton />
    </View>
  );
}

function SearchBar() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={mainStyles.searchContainer}
      onPress={() => navigation.navigate("Search" as never)}
    >
      <Ionicons
        name="search-outline"
        size={20}
        color="#A3A3A3"
        style={{ marginRight: 10 }}
      />
      <TextInput
        style={mainStyles.searchInput}
        placeholder="Search By Name"
        placeholderTextColor="#D3D3D3"
        editable={false}
      />
    </TouchableOpacity>
  );
}
function PictureButton() {
  const navigator = useNavigation();
  return (
    <TouchableOpacity
      style={mainStyles.pictureButton}
      onPress={() => navigator.navigate("PhotoSelector" as never)}
    >
      <Ionicons name="camera-outline" size={20} color="#FFF" />
    </TouchableOpacity>
  );
}

export const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 24,
    padding: 10,
    height: 38,
    flex: 1,
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
  searchAndPictureButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  pictureButton: {
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    padding: 10,
    height: 38,
    width: 60,
  },
});
