import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { StatusFilter } from "@/components/FilterBar";
import { DogItem } from "./DogItem";
import { mainStyles, SearchBarAndPictureButton } from "./mainView";
import { DogFromBackend, useDogStore } from "@/src/store/dogStore";
import { useFirebaseAuth, useUserStore } from "@/src/store/userStore";
import { getAllDogs } from "./mainModel";
import { DogStatus, useFilterStore } from "@/src/store/filterStore";
import { TeacherHomeContainer } from "../../teacherHomeStyles";

const getDogData = async (idToken: any) => {
  try {
    const dogsData = await getAllDogs(idToken);
    return dogsData;
  } catch (error) {
    console.error("Failed to fetch dogs:", error);
  }
};

// 필터링 함수
export const filterDogsByStatus = (
  status: DogStatus,
  dogs: DogFromBackend[]
): DogFromBackend[] => {
  switch (status) {
    case DogStatus.ALL:
      return dogs;
    case DogStatus.NOT_STARTED:
      return dogs.filter(
        (dog) => !dog.diaryPhotoStatus && !dog.diaryNoteStatus
      );
    case DogStatus.DRAFT:
      return dogs.filter(
        (dog) =>
          (dog.diaryPhotoStatus && !dog.diaryNoteStatus) ||
          (!dog.diaryPhotoStatus && dog.diaryNoteStatus)
      );
    case DogStatus.SENT:
      return dogs.filter((dog) => dog.diaryPhotoStatus && dog.diaryNoteStatus);
    default:
      return dogs;
  }
};

export default function TeacherHomePage() {
  const { status } = useFilterStore();
  const [filteredDogs, setFilteredDogs] = useState<DogFromBackend[]>([]);
  const { dogs, setDogs } = useDogStore();
  const { idToken } = useFirebaseAuth();

  useEffect(() => {
    const fetchData = async () => {
      const dogsData = await getDogData(idToken);
      if (dogsData) {
        setDogs(dogsData);
        setFilteredDogs(dogsData); // 초기 상태에 모든 강아지 리스트 표시
      }
      // console.log("dogsData : ", dogsData); // 받아온 모든 강아지 리스트
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = filterDogsByStatus(status, dogs);
    setFilteredDogs(filteredData);
  }, [status, dogs]);

  return (
    <TeacherHomeContainer>
      <SearchBarAndPictureButton />

      <StatusFilter
        statusOptions={Object.values(DogStatus)}
        onStatusChange={(status: DogStatus) =>
          useFilterStore.getState().setStatus(status)
        }
      />

      <FlatList
        data={filteredDogs}
        renderItem={({ item }) => <DogItem dog={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={mainStyles.listContainer}
      />
    </TeacherHomeContainer>
  );
}

// // 필터링 함수
// export const filterDogsByStatus = (status: DogStatus, dogs: Dog[]): Dog[] => {
//   switch (status) {
//     case DogStatus.ALL:
//       return dogs;
//     case DogStatus.NOT_STARTED:
//       return dogs.filter(
//         (dog) => !dog.diaryPhotoStatus && !dog.diaryNoteStatus
//       );
//     case DogStatus.DRAFT:
//       return dogs.filter(
//         (dog) =>
//           (dog.diaryPhotoStatus && !dog.diaryNoteStatus) ||
//           (!dog.diaryPhotoStatus && dog.diaryNoteStatus)
//       );
//     case DogStatus.SENT:
//       return dogs.filter((dog) => dog.diaryPhotoStatus && dog.diaryNoteStatus);
//     default:
//       return dogs;
//   }
// };
