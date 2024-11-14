import { DogForReservationStatus } from "@/src/store/filterStore";
import { DogForReservation } from "@/src/store/reservationStore";

export const filterDogsByStatus = (
  status: DogForReservationStatus,
  dogs: DogForReservation[]
): DogForReservation[] => {
  switch (status) {
    case DogForReservationStatus.PENDING:
      return dogs; // 모든 강아지 리스트 반환
    case DogForReservationStatus.ACCEPTED:
      return dogs.filter((dog) => dog.ispending); // 분류, 문서화 모두 되지 않은 강아지
    case DogForReservationStatus.DECLINED:
      return dogs.filter((dog) => !dog.ispending);
    default:
      return dogs; // 정의되지 않은 상태일 경우 전체 리스트 반환
  }
};
