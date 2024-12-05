import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { StatusFilter } from "@/components/FilterBar";
import { DogItem, DogStatusInfoList } from "./DogItem";
import { mainStyles, SearchBarAndPictureButton } from "./mainView";
import { DogFromBackend, useDogStore } from "@/src/store/dogStore";
import { useFirebaseAuth } from "@/src/store/userStore";
import { getAllDogs } from "./mainModel";
import { DogStatus, useFilterStore } from "@/src/store/filterStore";
import { TeacherHomeContainer } from "../../teacherHomeStyles";
import { fetchWithDelay } from "@/src/utils/fetchWithDelay";

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
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setRefreshing(true);
    try {
      const dogsData = await fetchWithDelay(() => getAllDogs(idToken));

      if (dogsData) {
        setDogs(dogsData);
        setFilteredDogs(dogsData);
      }
    } catch (error) {
      console.error("Failed to fetch dogs:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
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
        renderItem={({ item }) => (
          <DogItem
            dog={item}
            children={
              <DogStatusInfoList
                diaryPhotoStatus={item.diaryPhotoStatus}
                diaryNoteStatus={item.diaryNoteStatus}
              />
            }
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={mainStyles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchData}
            colors={["#6C4F3E"]}
            tintColor="#6C4F3E"
          />
        }
      />
    </TeacherHomeContainer>
  );
}
