import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { BookedCard, NoCardComponent } from "./reservationView";
import { StatusFilter } from "@/src/components/FilterBar";
import { useFirebaseAuth } from "@/src/store/userStore";
import { makePhoneCall, parentReservationAPI } from "./reservationModel";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Center } from "./(add-reservation)";
import { useFocusEffect } from "expo-router";

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

  // 예약 데이터 불러오기
  // 오늘 날짜 기준으로 예약 데이터 분리
  // 최신순 정렬
  const getReservationData = async () => {
    const response = await parentReservationAPI(idToken);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 오늘 날짜의 시작시간으로 설정

    // 예약 데이터 분리
    const { futureReservations, pastReservations } = response.reduce(
      (
        acc: {
          futureReservations: Reservation[];
          pastReservations: Reservation[];
        },
        reservation: Reservation
      ) => {
        const reservationDate = new Date(reservation.date);
        reservationDate.setHours(0, 0, 0, 0);

        if (reservationDate >= today) {
          acc.futureReservations.push(reservation);
        } else {
          acc.pastReservations.push(reservation);
        }
        return acc;
      },
      {
        futureReservations: [],
        pastReservations: [],
      }
    );

    // 각각 날짜순 정렬 (최신순)
    const sortedFuture = futureReservations.sort(
      (a: Reservation, b: Reservation) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    const sortedPast = pastReservations.sort(
      (a: Reservation, b: Reservation) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    setReservationList(sortedFuture);
    setHistoryList(sortedPast);
  };

  useFocusEffect(
    useCallback(() => {
      getReservationData();
    }, [])
  );

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
            {reservationList.reverse().map((reservation: Reservation) => (
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
