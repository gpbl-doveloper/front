import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { BookedCard } from "./reservationView";
import { StatusFilter } from "@/src/components/FilterBar";
import { useFirebaseAuth } from "@/src/store/userStore";
import { parentReservationAPI } from "./reservationModel";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Center } from "./(add-reservation)";

export type Reservation = {
  id: number;
  dogId: number;
  date: string;
  status: string;
  createdAt: string;
  centerId: number;
  center: Center;
};

export function ReservationPage() {
  const navigation = useNavigation();
  const [status, setStatus] = useState<string>("Dog");
  const [reservationList, setReservationList] = useState<Reservation[]>([]);
  const [historyList, setHistoryList] = useState<Reservation[]>([]);
  const { idToken } = useFirebaseAuth();
  const getReservationData = async () => {
    const response = await parentReservationAPI(idToken);
    setReservationList(response);
    console.log(response);
  };

  useEffect(() => {
    getReservationData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reservation</Text>
      <StatusFilter
        statusOptions={["Booked", "History"]}
        onStatusChange={setStatus}
      />
      <ScrollView style={styles.content}>
        <TouchableOpacity
          style={styles.reservationButton}
          onPress={() => navigation.navigate("AddReservation")}
        >
          <Text style={styles.buttonText}>Make Reservation</Text>
          <Ionicons name="chevron-forward" size={24} color="#55382A" />
        </TouchableOpacity>
        {status === "History"
          ? historyList.map((reservation: Reservation) => {
              return (
                <BookedCard key={reservation.id} reservation={reservation} />
              );
            })
          : reservationList.map((reservation: Reservation) => (
              <BookedCard key={reservation.id} reservation={reservation} />
            ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8EE",
    gap: 10,
    paddingVertical: 24,
    paddingHorizontal: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  value: {
    fontSize: 16,
  },
  reservationButton: {
    borderColor: "#55382A",
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonText: {
    color: "#55382A",
    fontSize: 16,
  },
});
