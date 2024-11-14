import { create } from "zustand";

// DogStatus enum
export enum DogStatus {
  ALL = "All",
  NOT_STARTED = "Not Started",
  DRAFT = "Draft",
  SENT = "Sent",
  MEDICINE = "Medicine",
}

export interface DogForTeacherHomeList {
  id: number;
  status: DogStatus;
}

interface FilterStore {
  status: DogStatus;
  setStatus: (status: DogStatus) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  status: DogStatus.ALL,
  setStatus: (status) => set({ status }),
}));

// DogForReservationList enum
export enum DogForReservationStatus {
  PENDING = "Pending",
  ACCEPTED = "Accepted",
  DECLINED = "Declined",
}

// 예약 상태 관리용 인터페이스
interface ReservationFilterStore {
  reservationStatus: DogForReservationStatus;
  setReservationStatus: (status: DogForReservationStatus) => void;
}

export const useReservationFilterStore = create<ReservationFilterStore>((set) => ({
  reservationStatus: DogForReservationStatus.PENDING,
  setReservationStatus: (status) => set({ reservationStatus: status }),
}));
