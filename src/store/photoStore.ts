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
