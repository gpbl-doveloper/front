import { getCenterReservation } from "@/src/apis/apiReservations/get";
import {
  putCenterAcceptReservation,
  putCenterRejectReservation,
} from "@/src/apis/apiReservations/put";
import showReservationAlert from "@/src/components/alerts/reservationAlerts";
import { CenterReservatedData } from "@/src/store/reservationStore";
import { handleReservationError } from "@/src/utils/errors/errorHandlers";

// 예약 데이터 가져오기
export const getReservationDogs = async (
  idToken: string
): Promise<CenterReservatedData[]> => {
  try {
    const response = await getCenterReservation(idToken);
    return response.data.reservations;
  } catch (error) {
    return handleReservationError(error, "fetch dogs");
  }
};

// 예약 수락 및 거절 API 호출 함수
const callReservationAPI = async (
  action: "accept" | "decline",
  idToken: string,
  reservationId: number
) => {
  try {
    const api =
      action === "accept"
        ? putCenterAcceptReservation
        : putCenterRejectReservation;
    const response = await api(idToken, reservationId);
    return response.data;
  } catch (error) {
    handleReservationError(error, `${action} reservation`);
  }
};

// 메인 핸들러
export const handleReservationStatus = async (
  action: "accept" | "decline",
  reservationId: number,
  idToken: string,
  onRefresh: () => Promise<void>
) => {
  try {
    const result = await callReservationAPI(action, idToken, reservationId);
    await onRefresh();

    if (result.success) {
      showReservationAlert("success", action);
    }
  } catch (error) {
    showReservationAlert("error", action);
  }
};
