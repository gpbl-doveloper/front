import { getCenterReservation } from "@/src/apis/apiReservations/get";
import {
  putCenterAcceptReservation,
  putCenterRejectReservation,
} from "@/src/apis/apiReservations/put";
import { CenterReservatedData } from "@/src/store/reservationStore";

export const getReservationDogs = async (
  idToken: string
): Promise<CenterReservatedData[]> => {
  try {
    const response = await getCenterReservation(idToken);
    return response.data.reservations;
  } catch (error) {
    console.error("Failed to fetch dogs:", error);
    throw error;
  }
};

// 예약 수락
export const acceptReservationAPI = async (
  idToken: string,
  reservationId: number
) => {
  try {
    const response = await putCenterAcceptReservation(idToken, reservationId);
    return response.data;
  } catch (error) {
    console.error("Failed to change reservation status:", error);
    throw error;
  }
};

// 예약 거절
export const declineReservationAPI = async (
  idToken: string,
  reservationId: number
) => {
  try {
    const response = await putCenterRejectReservation(idToken, reservationId);
    return response.data;
  } catch (error) {
    console.error("Failed to decline reservation:", error);
    throw error;
  }
};
