import React, { useCallback, useMemo, useState } from "react";
import { StatusFilter } from "@/src/components/FilterBar";
import { CenterReservatedData } from "@/src/store/reservationStore";
import { getReservationDogs } from "./reservationModel";
import { DogForReservationStatus } from "@/src/store/filterStore";
import { AppointmentCard } from "./components/AppointmentCard";
import { TeacherHomeContainer } from "../teacherHomeStyles";
import { useFirebaseAuth } from "@/src/store/userStore";
import { FlatList, RefreshControl } from "react-native";
import { fetchWithDelay } from "@/src/utils/fetchWithDelay";
import { useFocusEffect } from "@react-navigation/native";
import reservationStyles from "./styles";
import { NoDataComponent } from "./components/NoDataComponent";
import { ReservationDate } from "@/src/components/DatePicker";
import { RESERVATION_STATUS_OPTIONS } from "./constants";

export default function ReservationPage() {
  const [selectedStatus, setSelectedStatus] = useState<DogForReservationStatus>(
    DogForReservationStatus.PENDING
  );
  const [dogs, setDogs] = useState<CenterReservatedData[]>([]);
  const { idToken } = useFirebaseAuth();
  const [refreshing, setRefreshing] = useState(false);

  const fetchReservationData = useCallback(async () => {
    setRefreshing(true);
    try {
      const dogsData = await fetchWithDelay(() => getReservationDogs(idToken));
      if (dogsData) {
        setDogs(dogsData);
      }
    } catch (error) {
      console.error("Failed to fetch dogs:", error);
    } finally {
      setRefreshing(false);
    }
  }, [idToken]);

  const handleStatusChange = useCallback((status: DogForReservationStatus) => {
    setSelectedStatus(status);
  }, []);

  // 상태에 따른 필터링, 로직을 useMemo로 최적화
  const filteredData = useMemo(
    () => dogs.filter((dog) => dog.status === selectedStatus),
    [dogs, selectedStatus]
  );

  const keyExtractor = useCallback(
    (item: CenterReservatedData) => item.id.toString(),
    []
  );

  const renderItem = useCallback(
    ({ item }: { item: CenterReservatedData }) => (
      <AppointmentCard item={item} onRefresh={fetchReservationData} />
    ),
    [fetchReservationData]
  );

  const refreshControl = (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={fetchReservationData}
      colors={["#6C4F3E"]}
      tintColor="#6C4F3E"
    />
  );

  useFocusEffect(
    useCallback(() => {
      fetchReservationData();
    }, [fetchReservationData])
  );

  return (
    <TeacherHomeContainer>
      <ReservationDate />
      <StatusFilter
        statusOptions={RESERVATION_STATUS_OPTIONS}
        onStatusChange={handleStatusChange}
      />
      {filteredData.length === 0 ? (
        <NoDataComponent text={selectedStatus.toLowerCase()} />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={reservationStyles.listContent}
          refreshControl={refreshControl}
        />
      )}
    </TeacherHomeContainer>
  );
}
