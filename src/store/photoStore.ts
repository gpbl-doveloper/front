import { create } from "zustand";

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
