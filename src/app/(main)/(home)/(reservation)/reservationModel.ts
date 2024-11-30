import { getParentReservation } from "@/src/apis/apiReservations/get";

export const parentReservationAPI = async (idToken: string) => {
  const response = await getParentReservation(idToken);
  return response.data.reservations;
};
