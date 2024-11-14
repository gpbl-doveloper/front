import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useSearchStore } from "@/src/store/searchStore";
import { TeacherHomeContainer } from "../../teacherHomeStyles";
import {
  RecentSearchesAndClear,
  SearchData,
  SearchInputBar,
  SearchResult,
} from "./searchView";
import { DogForTeacherHomeList, useDogStore } from "@/src/store/dogStore";

export default function SearchPage() {
  const { recentSearches, addSearch } = useSearchStore();
  const [searchText, setSearchText] = useState("");
  const [filteredDogs, setFilteredDogs] = useState<DogForTeacherHomeList[]>([]);
  const { dogs } = useDogStore();

  const filterDogsByName = (searchText: string) => {
    return dogs.filter((dog) =>
      dog.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  useEffect(() => {
    const filteredDogs = filterDogsByName(searchText);
    setFilteredDogs(filteredDogs);
  }, [searchText, dogs]);

  const handleSearchSubmit = () => {
    addSearch(searchText);
    setSearchText("");
    const filteredDogs = filterDogsByName(searchText);
    setFilteredDogs(filteredDogs);
  };

  return (
    <TeacherHomeContainer>
      {/* 검색창 */}
      <SearchInputBar
        searchText={searchText}
        setSearchText={setSearchText}
        handleSearchSubmit={handleSearchSubmit}
      />

      {/* 최근 검색어 */}
      <RecentSearchesAndClear />

      {searchText.length === 0 ? (
        <FlatList
          data={recentSearches.slice().reverse()}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SearchData item={item} setSearchText={setSearchText} />
          )}
        />
      ) : (
        <SearchResult filteredDogs={filteredDogs} />
      )}
    </TeacherHomeContainer>
  );
}
