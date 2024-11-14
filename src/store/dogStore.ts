import { create } from "zustand";

export interface DogForTeacherHomeList {
  id: number; // 강아지 ID
  name: string; // 강아지 이름
  image: string; // 강아지 이미지 URL
  isClassified: boolean; // 이미지 분류 완료 여부
  isDocumented: boolean; // 노트 작성 완료 여부
}

interface DogStore {
  dogs: DogForTeacherHomeList[];
  setDogs: (dogs: DogForTeacherHomeList[]) => void;
}

export const useDogStore = create<DogStore>((set) => ({
  dogs: [],
  setDogs: (dogs) => set({ dogs }),
}));
