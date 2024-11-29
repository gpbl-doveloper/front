import { SearchInputBar } from "@/src/components/SearchInputBar";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { findCenterAPI } from "./addReservationModel";
import { useFirebaseAuth } from "@/src/store/userStore";
import { ReservationCard } from "../reservationView";

export type Center = {
  id: number;
  name: string;
  address: string;
  description: string;
  phone: string;
  createdAt: string;
};

export function AddReservationPage() {
  const [searchText, setSearchText] = useState("");
  const [centerList, setCenterList] = useState<Center[]>([]);
  const { idToken } = useFirebaseAuth();
  const handleSearchSubmit = async () => {
    const response = await findCenterAPI(idToken, searchText);
    setCenterList(response);
  };

  return (
    <View style={styles.container}>
      <SearchInputBar
        searchText={searchText}
        setSearchText={setSearchText}
        handleSearchSubmit={handleSearchSubmit}
      />
      <ScrollView style={styles.centerList}>
        {centerList.map((center: Center) => (
          <ReservationCard key={center.id} center={center} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8EE",
    paddingVertical: 24,
    paddingHorizontal: 12,
  },
  centerList: {},
});
