import { create } from "zustand";

interface Owner {
  name: string;
  phone: string;
  email: string;
}

export interface DogForReservation {
  id: number; // 강아지 ID
  name: string; // 강아지 이름
  img: string; // 강아지 이미지
  bod: Date; // 강아지 생일
  breed: string; // 강아지 품종
  medicine: string; // 강아지 약
  owner: Owner;
  ispending: boolean; // 이 강아지 예약 정보가 어떻게 분류되는지 상태인데
  // pending, accepted, declined3개 할거면 number
  // pending declined 이렇게 2개 할거면 boolean
}
interface ReservationStore {
  reservation: DogForReservation[];
}

export const useReservationStore = create<ReservationStore>((set) => ({
  reservation: [],
  setReservation: (reservation: any) => set({ reservation }),
}));
