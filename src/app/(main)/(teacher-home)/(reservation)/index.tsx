import React, { useEffect, useState } from "react";
import { StatusFilter } from "@/src/components/FilterBar";
import { CenterReservatedData } from "@/src/store/reservationStore";
import { getReservationDogs } from "./reservationModel";
import { DogForReservationStatus } from "@/src/store/filterStore";
import {
  NoDataComponent,
  ReservationDate,
  ReservationList,
} from "./reservationView";
import { TeacherHomeContainer } from "../teacherHomeStyles";
import { useFirebaseAuth } from "@/src/store/userStore";

const RESERVATION_STATUS_OPTIONS = ["PENDING", "ACCEPTED", "DECLINED"];

export default function ReservationPage() {
  const [selectedStatus, setSelectedStatus] = useState<
    "PENDING" | "ACCEPTED" | "DECLINED"
  >("PENDING");
  const [dogs, setDogs] = useState<CenterReservatedData[]>([]);
  const [filteredData, setFilteredData] = useState<CenterReservatedData[]>([]);
  const { idToken } = useFirebaseAuth();

  const getDogData = async () => {
    try {
      const dogsData = await getReservationDogs(idToken);
      return dogsData;
    } catch (error) {
      console.error("Failed to fetch dogs:", error);
    }
  };

  useEffect(() => {
    const fetchReservationData = async () => {
      const dogsData = await getDogData();
      if (dogsData) {
        setDogs(dogsData);
        // 초기 상태에서 PENDING 상태의 데이터만 필터링
        const initialFiltered = dogsData.filter(
          (dog) => dog.status === "PENDING"
        );
        setFilteredData(initialFiltered);
      }
    };
    fetchReservationData();
  }, []);

  // 상태에 따른 필터링
  useEffect(() => {
    const filteredData = dogs.filter((dog) => dog.status === selectedStatus);
    setFilteredData(filteredData);
  }, [selectedStatus, dogs]);

  const handleStatusChange = (status: DogForReservationStatus) => {
    setSelectedStatus(status);
  };

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
        <ReservationList filteredData={filteredData} />
      )}
    </TeacherHomeContainer>
  );
}
