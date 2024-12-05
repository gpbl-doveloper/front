import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { DogItem } from "./DogItem";
import { useFirebaseAuth } from "../../store/userStore";
import { getParentDogListAPI } from "./dogListModel";
import { SmallLogo } from "@/src/components/Logos";
import { Dog } from "@/src/store/dogStore";
import { fetchWithDelay } from "@/src/utils/fetchWithDelay";

function SelectDogPage() {
  const [dogList, setDogList] = useState<Dog[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { idToken } = useFirebaseAuth();

  const dogListData = async () => {
    setRefreshing(true);
    try {
      const data = await fetchWithDelay(() => getParentDogListAPI(idToken));
      setDogList(data);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  // [parent] 사용자의 강아지 목록을 가져오는 API 호출
  useFocusEffect(
    useCallback(() => {
      dogListData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SmallLogo width={50} height={50} />
      </View>
      <ScrollView
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={dogListData}
            colors={["#6C4F3E"]} // 안드로이드용 로딩 색상
            tintColor="#6C4F3E" // iOS용 로딩 색상
          />
        }
      >
        <View style={styles.dogListContainer}>
          {dogList.map((dog) => (
            <DogItem key={dog.id} dog={dog} />
          ))}
        </View>

        <AddDogAtSelectDog />
      </ScrollView>
    </View>
  );
}

function AddDogAtSelectDog() {
  const navigator = useNavigation();
  return (
    <TouchableOpacity
      style={styles.addButton}
      onPress={() => navigator.navigate("AddDog")}
    >
      <Text style={styles.addButtonText}>+ Add profile</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: "#FFF8EF",
  },
  listContainer: {
    flexGrow: 1,
  },
  header: {
    alignItems: "center",
    paddingBottom: 20,
  },
  dogListContainer: {
    width: "100%",
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: "100%",
    height: 114,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#C4C4C4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  profileImage: {
    width: 30,
    height: 30,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  addButton: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6C4F3E",
  },
});

export default SelectDogPage;
