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
  diary: Diary;
  setDiary: (diary: Diary) => void;
}

export const useSingleDiaryStore = create<SingleDiaryStore>((set) => ({
  diary: {
    id: 1,
    activities: "Played fetch, walked around the park",
    createdAt: "2024-11-14T09:30:00Z",
    feedingTime: 2,
    feedingAmt: "Some",
    napStart: "2024-11-14T12:00:00Z",
    napEnd: "2024-11-14T12:45:00Z",
    note: "Had a great time playing, but seemed a bit tired afterward",
    sentAt: "2024-11-14T13:00:00Z",
    dogId: 1,
    centerId: 1,
  },
  setDiary: (diary: any) => set({ diary }),
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
