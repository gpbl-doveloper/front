import { getCenterList } from "@/src/apis/apiCenters/get";
import { postParentReservation } from "@/src/apis/apiReservations/post";

export const findCenterAPI = async (idToken: string, searchText: string) => {
  const response = await getCenterList(idToken, searchText);
  return response.data.centers;
};

type ReservationData = {
  dogId: number;
  date: string;
  centerId: number;
};

export const makeReservationAPI = async (
  idToken: string,
  reservationData: ReservationData
) => {
  const response = await postParentReservation(idToken, reservationData);
  return response.data;
};
