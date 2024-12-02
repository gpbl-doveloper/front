import { create } from "zustand";
import { Dog } from "./dogStore";

//나중에 갈아엎을듯함요
interface Owner {
  id: number;
  name: string;
  role: string;
  phone: string;
  email: string;
}

// 이거 쓰는지 안쓰는지 확인하고 안쓰면 버림
export interface DogForReservation {
  id: number; // 강아지 ID
  name: string; // 강아지 이름
  img: string; // 강아지 이미지
  bod: Date; // 강아지 생일
  breed: string; // 강아지 품종
  medicine: string; // 강아지 약
  owner: Owner;
  ispending: boolean; // 이 강아지 예약 정보가 어떻게 분류되는지 상태인데
}
interface ReservationStore {
  reservation: DogForReservation[];
}

export const useReservationStore = create<ReservationStore>((set) => ({
  reservation: [],
  setReservation: (reservation: any) => set({ reservation }),
}));

export interface CenterReservationDog extends Dog {
  owner: Owner;
}

export interface CenterReservatedData {
  centerId: number;
  createdAt: string;
  date: string;
  dog: CenterReservationDog;
  dogId: number;
  id: number;
  status: "PENDING" | "ACCEPTED" | "DECLINED"; // 상태값은 실제 사용되는 값들로 수정하시면 됩니다
}
