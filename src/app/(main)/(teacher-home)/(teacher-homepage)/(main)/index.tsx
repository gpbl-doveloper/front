import React, { useCallback, useEffect, useState } from "react";
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
import { useDiaryPhotoStore } from "@/src/store/photoStore";
import { getCenterTodayPictureAPI } from "../(dog-detail)/dogDetailModel";
import { useSingleDiaryStore } from "@/src/store/diaryStore";
import { useFocusEffect } from "@react-navigation/native";
import { filterDogsByStatus } from "./utils/filterDogsByStatus";

export default function TeacherHomePage() {
  const { status } = useFilterStore();
  const [filteredDogs, setFilteredDogs] = useState<DogFromBackend[]>([]);
  const { dogs, setDogs } = useDogStore();
  const { idToken } = useFirebaseAuth();
  const [refreshing, setRefreshing] = useState(false);
  const { resetDiary } = useSingleDiaryStore();

  const { setDiaryPhotos } = useDiaryPhotoStore();

  // [center] 오늘 올린 모든 사진 불러오기
  const fetchTodayPhotoData = useCallback(async () => {
    try {
      const photoData = await getCenterTodayPictureAPI(idToken, new Date());
      setDiaryPhotos(photoData);
      return photoData;
    } catch (error) {
      console.error("Failed to fetch photo data:", error);
    }
  }, [idToken]);

  // 강아지 리스트 불러오기
  const fetchData = useCallback(async () => {
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
  }, [idToken, setDogs]);

  useEffect(() => {
    const filteredData = filterDogsByStatus(status, dogs);
    setFilteredDogs(filteredData);
  }, [status, dogs]);

  // 메인 화면 포커스 될 때마다 실행 (오늘 사진 불러오기, 강아지 리스트 불러오기, 일기 초기화)
  useFocusEffect(
    useCallback(() => {
      fetchTodayPhotoData();
      fetchData();
      resetDiary();
    }, [fetchTodayPhotoData, fetchData, resetDiary])
  );

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
