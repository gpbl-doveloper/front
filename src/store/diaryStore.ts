import { create } from "zustand";

interface File {
  id: number;
  fileKey: string;
  fileURL: string;
  createdAt: string;
  diaryId: number;
}

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
}

export const useSingleDiaryStore = create<SingleDiaryStore>((set) => ({
  diary: null,
  setDiary: (diary: Diary | null) => set({ diary }),
}));

// export interface DiaryStore {
//   diaries: Diary[];
//   setDiaries: (diaries: Diary[]) => void;
// }
// export const useDiaryStore = create<DiaryStore>((set) => ({
//   diaries: [],
//   setDiaries: (diaries) => set({ diaries }),
// }));

// export interface AddDiaryState {
//   inputDiaryContent: string;
//   inputDiaryFiles: string[];
// }

// interface AddDiaryStore extends AddDiaryState {
//   setInputDiaryContent: (content: string) => void;
//   setInputDiaryFiles: (files: string[]) => void;
// }

// export const useAddDiaryStore = create<AddDiaryStore>((set) => ({
//   inputDiaryContent: "",
//   inputDiaryFiles: [],
//   setInputDiaryContent: (inputDiaryContent) => set({ inputDiaryContent }),
//   setInputDiaryFiles: (inputDiaryFiles) => set({ inputDiaryFiles }),
// }));
