import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { StatusFilter } from "@/components/FilterBar";
import { DogItem } from "./DogItem";
import { mainStyles, SearchBarAndPictureButton } from "./mainView";
import { DogForTeacherHomeList, useDogStore } from "@/src/store/dogStore";
import { useUserStore } from "@/src/store/userStore";
import { getAllDogs } from "./mainModel";
import { DogStatus, useFilterStore } from "@/src/store/filterStore";
import { TeacherHomeContainer } from "../../teacherHomeStyles";

export default function TeacherHomePage() {
  const { status } = useFilterStore();
  const [filteredDogs, setFilteredDogs] = useState<DogForTeacherHomeList[]>([]);
  const { dogs, setDogs } = useDogStore();

  useEffect(() => {
    const fetchData = async () => {
      const dogsData = await getDogData();
      if (dogsData) {
        setDogs(dogsData);
        setFilteredDogs(dogsData); // 초기 상태에 모든 강아지 리스트 표시
      }
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

// 사용자 ID 확인
const checkUserId = () => {
  const userId = useUserStore.getState().user?.id; // Zustand에서 유저 ID 가져오기
  if (!userId) {
    throw new Error("사용자 ID가 없습니다");
  }
  return userId;
};

const getDogData = async () => {
  try {
    // const userId = checkUserId();
    const userId = 1;
    const dogsData = await getAllDogs(userId);
    console.log("dogsData", dogsData);
    return dogsData;
  } catch (error) {
    console.error("Failed to fetch dogs:", error);
  }
};

// 필터링 함수
export const filterDogsByStatus = (
  status: DogStatus,
  dogs: DogForTeacherHomeList[]
): DogForTeacherHomeList[] => {
  switch (status) {
    case DogStatus.ALL:
      return dogs;
    case DogStatus.NOT_STARTED:
      return dogs.filter((dog) => !dog.isClassified && !dog.isDocumented);
    case DogStatus.DRAFT:
      return dogs.filter(
        (dog) =>
          (dog.isClassified && !dog.isDocumented) ||
          (!dog.isClassified && dog.isDocumented)
      );
    case DogStatus.SENT:
      return dogs.filter((dog) => dog.isClassified && dog.isDocumented);
    default:
      return dogs;
  }
};
