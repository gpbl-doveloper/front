import { Reservation } from "../app/(main)/(home)/(reservation)";

const sortReservations = (
  reservations: Reservation[],
  isAscending: boolean
) => {
  return [...reservations].sort((a, b) => {
    const comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
    return isAscending ? comparison : -comparison;
  });
};

export default sortReservations;
