import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { BookedCard, NoCardComponent } from "./reservationView";
import { StatusFilter } from "@/src/components/FilterBar";
import { useFirebaseAuth } from "@/src/store/userStore";
import { makePhoneCall, parentReservationAPI } from "./reservationModel";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Center } from "./(add-reservation)";
import { useFocusEffect } from "expo-router";
import separateReservations from "@/src/utils/reservation/seperateReservations";
import sortReservations from "@/src/utils/reservation/sortReservations";
import { fetchWithDelay } from "@/src/utils/fetchWithDelay";

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
  const [refreshing, setRefreshing] = useState(false);

  // 예약 데이터 불러오기
  const getReservationData = async () => {
    try {
      setRefreshing(true);
      const response = await fetchWithDelay(() =>
        parentReservationAPI(idToken)
      );

      const { futureReservations, pastReservations } =
        separateReservations(response);

      setReservationList(sortReservations(futureReservations, true)); // 오름차순
      setHistoryList(sortReservations(pastReservations, false)); // 내림차순
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getReservationData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reservation</Text>
      <StatusFilter
        statusOptions={["Booked", "History"]}
        onStatusChange={setStatus}
      />
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getReservationData}
            colors={["#6C4F3E"]} // 안드로이드용 로딩 색상
            tintColor="#6C4F3E" // iOS용 로딩 색상
          />
        }
      >
        {status === "History" ? (
          historyList.length === 0 ? (
            <NoCardComponent text="past reservations" />
          ) : (
            historyList.map((reservation: Reservation) => {
              return (
                <BookedCard
                  key={reservation.id}
                  reservation={reservation}
                  buttonText="Reschedule"
                  onPress={() => console.log("reschedule 해야함 ㅅㄱ")}
                />
              );
            })
          )
        ) : reservationList.length === 0 ? (
          <NoCardComponent text="upcoming events" />
        ) : (
          <>
            <TouchableOpacity
              style={styles.reservationButton}
              onPress={() => navigation.navigate("AddReservation")}
            >
              <Text style={styles.buttonText}>Make Reservation</Text>
              <Ionicons name="chevron-forward" size={24} color="#55382A" />
            </TouchableOpacity>
            {reservationList.map((reservation: Reservation) => (
              <BookedCard
                key={reservation.id}
                reservation={reservation}
                onPress={() => makePhoneCall(reservation.center.phone)}
                buttonText="Call"
              />
            ))}
          </>
        )}
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
