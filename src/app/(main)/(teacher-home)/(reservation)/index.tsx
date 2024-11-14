import React, { useEffect, useState } from "react";
import { StatusFilter } from "@/src/components/FilterBar";
import { DogForReservation } from "@/src/store/reservationStore";
import { getReservationDogs } from "./reservationModel";
import { DogForReservationStatus } from "@/src/store/filterStore";
import { ReservationDate, ReservationList } from "./reservationView";
import { TeacherHomeContainer } from "../teacherHomeStyles";
import { filterDogsByStatus } from "./reservationController";

const getDogData = async () => {
  try {
    // const userId = checkUserId();
    const userId = 1;
    const dogsData = await getReservationDogs(userId);
    return dogsData;
  } catch (error) {
    console.error("Failed to fetch dogs:", error);
  }
};

// ReservationPage 컴포넌트
export default function ReservationPage() {
  const [selectedStatus, setSelectedStatus] = useState("Pending");
  const [dogs, setDogs] = useState<DogForReservation[]>([]);
  const [filteredData, setFilteredData] = useState<DogForReservation[]>([]);

  //데이터 백엔드에서 가져오기
  useEffect(() => {
    const fetchReservationData = async () => {
      const dogsData = await getDogData();
      if (dogsData) {
        setDogs(dogsData);
        setFilteredData(dogsData); // 초기 상태에 모든 강아지 리스트 표시
      }
    };
    fetchReservationData();
  }, []);

  // 상태에 따른 필터링
  useEffect(() => {
    const filteredData = filterDogsByStatus(
      selectedStatus as DogForReservationStatus,
      dogs
    );
    setFilteredData(filteredData);
  }, [selectedStatus, dogs]);

  return (
    <TeacherHomeContainer>
      <ReservationDate />
      <StatusFilter
        statusOptions={["Pending", "Accepted", "Declined"]} // 새로운 상태 옵션 전달
        onStatusChange={(selectedStatus) => setSelectedStatus(selectedStatus)}
      />
      <ReservationList filteredData={filteredData} />
    </TeacherHomeContainer>
  );
}
