import { create } from "zustand";

export interface Diary {
  id: number;
  content: string;
  createdAt: string;
  authorId: number | null;
  dogId: number | null;
  files: File[];
}

interface File {
  id: number;
  fileKey: string;
  fileURL: string;
  createdAt: string;
  diaryId: number;
}

export interface SingleDiaryStore {
  diary: Diary;
  setDiary: (diary: Diary) => void;
}

export const useSingleDiaryStore = create<SingleDiaryStore>((set) => ({
  diary: {
    id: 0,
    content: "",
    createdAt: "",
    authorId: null,
    dogId: null,
    files: [],
  },
  setDiary: (diary: any) => set({ diary }),
}));

export interface DiaryStore {
  diaries: Diary[];
  setDiaries: (diaries: Diary[]) => void;
}
export const useDiaryStore = create<DiaryStore>((set) => ({
  diaries: [],
  setDiaries: (diaries) => set({ diaries }),
}));

export interface AddDiaryState {
  inputDiaryContent: string;
  inputDiaryFiles: string[];
}

interface AddDiaryStore extends AddDiaryState {
  setInputDiaryContent: (content: string) => void;
  setInputDiaryFiles: (files: string[]) => void;
}

export const useAddDiaryStore = create<AddDiaryStore>((set) => ({
  inputDiaryContent: "",
  inputDiaryFiles: [],
  setInputDiaryContent: (inputDiaryContent) => set({ inputDiaryContent }),
  setInputDiaryFiles: (inputDiaryFiles) => set({ inputDiaryFiles }),
}));
