import { DogForReservation } from "@/src/store/reservationStore";

export const getReservationDogs = async (
  userId: number
): Promise<DogForReservation[]> => {
  try {
    // const response = await fetch(
    //   `https://your-backend.com/dogs?userId=${userId}`
    // );
    // const dogs = await response.json();
    // return dogs;
    return dogsForReservation;
  } catch (error) {
    console.error("Failed to fetch dogs:", error);
    throw error;
  }
};

// 예시 데이터
const dogsForReservation: DogForReservation[] = [
  {
    id: 1,
    name: "Buddy",
    img: "https://example.com/dog1.jpg",
    bod: new Date(2019, 4, 15), // 2019년 5월 15일
    breed: "Golden Retriever",
    medicine: "Heartworm prevention",
    owner: {
      name: "John Doe",
      phone: "123-456-7890",
      email: "johndoe@example.com",
    },
    ispending: true, // pending 상태
  },
  {
    id: 2,
    name: "Bella",
    img: "https://example.com/dog2.jpg",
    bod: new Date(2020, 7, 24), // 2020년 8월 24일
    breed: "Labrador",
    medicine: "Arthritis medication",
    owner: {
      name: "Jane Smith",
      phone: "987-654-3210",
      email: "janesmith@example.com",
    },
    ispending: false, // declined 상태
  },
  {
    id: 3,
    name: "Max",
    img: "https://example.com/dog3.jpg",
    bod: new Date(2018, 10, 5), // 2018년 11월 5일
    breed: "Beagle",
    medicine: "Allergy medication",
    owner: {
      name: "Mike Johnson",
      phone: "987-654-3210",
      email: "mikejohnson@example.com",
    },
    ispending: true, // pending 상태
  },
  {
    id: 4,
    name: "Lucy",
    img: "https://example.com/dog4.jpg",
    bod: new Date(2017, 1, 12), // 2017년 2월 12일
    breed: "Bulldog",
    medicine: "Pain relief",
    owner: {
      name: "Emily Davis",
      phone: "555-555-5555",
      email: "emilydavis@example.com",
    },
    ispending: false, // declined 상태
  },
];
