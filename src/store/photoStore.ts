import { create } from "zustand";

// [center] 사진 업로드 시 상태 저장소
// 사진 업로드 시 이미 업로드한 내용들 올려두기
interface PhotoStore {
  sendedPhotos: string[];
  selectedPhotos: string[];
  setSendedPhotos: (sendedPhotos: string[]) => void;
  setSelectedPhotos: (selectedPhotos: string[]) => void;
}

export const usePhotoStore = create<PhotoStore>((set) => ({
  sendedPhotos: [],
  selectedPhotos: [],
  setSendedPhotos: (sendedPhotos) => set({ sendedPhotos }),
  setSelectedPhotos: (selectedPhotos) => set({ selectedPhotos }),
}));

// [parent] 다이어리 사진 받아올 시 상태 저장소
interface DiaryPhotoStore {
  diaryPhotos: string[];
  setDiaryPhotos: (diaryPhotos: string[]) => void;
}

interface SelectedDogPhotoStore {
  categorizedDogPhoto: string[];
  setCategorizedDogPhoto: (categorizedDogPhoto: string[]) => void;
}

// [center] 그날의 사진 받아올 시 상태 저장소
export const useDiaryPhotoStore = create<DiaryPhotoStore>((set) => ({
  diaryPhotos: [],
  setDiaryPhotos: (diaryPhotos) => set({ diaryPhotos }),
}));

export const useCategorizedDogPhotoStore = create<SelectedDogPhotoStore>(
  (set) => ({
    categorizedDogPhoto: [],
    setCategorizedDogPhoto: (categorizedDogPhoto) =>
      set({ categorizedDogPhoto }),
  })
);
