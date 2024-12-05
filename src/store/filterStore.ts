import { create } from "zustand";

// DogStatus enum
export enum DogStatus {
  ALL = "All",
  NOT_STARTED = "Not Started",
  DRAFT = "Draft",
  SENT = "Sent",
  MEDICINE = "Medicine",
}

// DogForReservationList enum
export enum DogForReservationStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
}

export interface DogForTeacherHomeList {
  id: number;
  status: DogStatus;
}

// 베이스 스토어 타입
interface BaseFilterStore<T> {
  status: T;
  setStatus: (status: T) => void;
}

type FilterStore = BaseFilterStore<DogStatus>;
export const useFilterStore = create<FilterStore>((set) => ({
  status: DogStatus.ALL,
  setStatus: (status) => set({ status }),
}));
