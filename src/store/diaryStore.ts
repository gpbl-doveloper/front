import { create } from "zustand";

export interface Diary {
  id: number;
  activities: string;
  createdAt: string;
  feedingTime: number;
  feedingAmt: string;
  napStart: string;
  napEnd: string;
  note: string;
  sentAt: string;
  centerId: number;
  dogId: number;
}

export interface SingleDiaryStore {
  diary: Diary | null;
  setDiary: (diary: Diary | null) => void;
  resetDiary: () => void;
}
// (dog-detail) 받아온 단일 일기 여기다 저장,
export const useSingleDiaryStore = create<SingleDiaryStore>((set) => ({
  diary: null,
  setDiary: (diary: Diary | null) => set({ diary }),
  resetDiary: () => set({ diary: null }),
}));
