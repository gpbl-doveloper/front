import { DogForTeacherHomeList } from "@/src/store/dogStore";

export const getAllDogs = async (
  userId: number
): Promise<DogForTeacherHomeList[]> => {
  try {
      // const response = await fetch(
      //   `https://your-backend.com/dogs?userId=${userId}`
      // );
      // const dogs = await response.json();
    // return dogs;
    return dogsForTeacherHomeList;
  } catch (error) {
    console.error("Failed to fetch dogs:", error);
    throw error;
  }
};

// 임시 데이터
const dogsForTeacherHomeList: DogForTeacherHomeList[] = [
  {
    id: 1,
    name: "Buddy",
    image: "https://example.com/dog1.jpg",
    isClassified: true,
    isDocumented: false,
  },
  {
    id: 2,
    name: "Bella",
    image: "https://example.com/dog2.jpg",
    isClassified: true,
    isDocumented: true,
  },
  {
    id: 3,
    name: "Charlie",
    image: "https://example.com/dog3.jpg",
    isClassified: false,
    isDocumented: false,
  },
  {
    id: 4,
    name: "Lucy",
    image: "https://example.com/dog4.jpg",
    isClassified: true,
    isDocumented: true,
  },
  {
    id: 5,
    name: "Max",
    image: "https://example.com/dog5.jpg",
    isClassified: false,
    isDocumented: true,
  },
  {
    id: 6,
    name: "Daisy",
    image: "https://example.com/dog6.jpg",
    isClassified: true,
    isDocumented: false,
  },
];
