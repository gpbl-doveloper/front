import { Reservation } from "@/src/app/(main)/(home)/(reservation)";
// 오늘 날짜 기준으로 예약 데이터 분리 및 정렬
const separateReservations = (reservations: Reservation[]) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return reservations.reduce(
    (
      acc: {
        futureReservations: Reservation[];
        pastReservations: Reservation[];
      },
      reservation
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
    { futureReservations: [], pastReservations: [] }
  );
};

export default separateReservations;
