import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { StatusFilter } from "@/components/FilterBar";
import { DogItem } from "./DogItem";
import { mainStyles, SearchBarAndPictureButton } from "./mainView";
import { Dog, useDogStore } from "@/src/store/dogStore";
import { useUserStore } from "@/src/store/userStore";
import { getAllDogs } from "./mainModel";
import { DogStatus, useFilterStore } from "@/src/store/filterStore";
import { TeacherHomeContainer } from "../../teacherHomeStyles";

// 사용자 ID 확인
const checkUserId = () => {
  const userId = useUserStore.getState().user?.uid; // Zustand에서 유저 ID 가져오기
  if (!userId) {
    throw new Error("사용자 ID가 없습니다");
  }
  return "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFlNTIxYmY1ZjdhNDAwOGMzYmQ3MjFmMzk2OTcwOWI1MzY0MzA5NjEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZ3BibC1kb3ZlbG9wZXIiLCJhdWQiOiJncGJsLWRvdmVsb3BlciIsImF1dGhfdGltZSI6MTczMTY2MDgzNSwidXNlcl9pZCI6InY2N1VNSXl5cTVYaGxSN2I3SzJZbjg0UTBnNTMiLCJzdWIiOiJ2NjdVTUl5eXE1WGhsUjdiN0syWW44NFEwZzUzIiwiaWF0IjoxNzMxNjYwODM1LCJleHAiOjE3MzE2NjQ0MzUsImVtYWlsIjoiOTk5QDk5OS5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiOTk5QDk5OS5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.Fztf-VI5g7xl2Qhp3a9xJ4Axv_1XSFj6enUtQZmezxWTIE7QV1f30wdWIM5dZrfI4JmNSsa5_6aGu1r-w3lsXjqq8UXGNzJMkwJx7iqRJJkDo-8V8v9hiycI-U6kgNEdDF0WknJ1IDL--hwmh1yPDuNf_kk7lJmBQi1cPMKDURzZYe905ACsujvW5XT8S0ICN8dPmngSIbhbFbAN9YC21Qmsngp4jw-ZsarpX5hEmzvFNIW7SGoN8bPAD24I4bYsmxTznKN5V6B1UMIUpQRq_Ak3jiEOLptNFevqCiTVBJ5HlLl9ve5tIQE8ixWLc0U9k0I_mM8-uBOpD3RJUfMwxg";
};

const getDogData = async () => {
  const userId = checkUserId();
  try {
    const dogsData = await getAllDogs(userId);
    console.log("dogsData", dogsData);
    return dogsData;
  } catch (error) {
    console.error("Failed to fetch dogs:", error);
  }
};

// 필터링 함수
export const filterDogsByStatus = (status: DogStatus, dogs: Dog[]): Dog[] => {
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

export default function TeacherHomePage() {
  const { status } = useFilterStore();
  const [filteredDogs, setFilteredDogs] = useState<Dog[]>([]);
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
