import { create } from "zustand";

export interface SelectedCenterStore {
  centerId: number;
  setCenterId: (centerId: number) => void;
}

// [parent] reservation 페이지에서 선택한 centerId를 저장하는 store
export const useSelectedCenterStore = create<SelectedCenterStore>((set) => ({
  centerId: 0,
  setCenterId: (centerId: number) => set({ centerId }),
}));
