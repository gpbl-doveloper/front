import { getParentReservation } from "@/src/apis/apiReservations/get";

export const parentReservationAPI = async (idToken: string) => {
  const response = await getParentReservation(idToken);
  // return response.data.reservations;
  return exampledata;
};

const exampledata = [
  {
    id: 1,
    dogId: 1,
    date: "2024-12-01T10:00:00.000Z",
    status: "DECLINED",
    createdAt: "2024-11-24T09:50:01.407Z",
    centerId: 2,
    center: {
      id: 2,
      name: "Happy Tails Pet Care",
      phone: "987-654-32100",
      description: "YYYYour pet's home away from home.",
      address: "1234 Pet Street, Petville, CA 12345",
      createdAt: "2024-11-21T08:30:09.285Z",
    },
  },
];
