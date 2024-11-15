import { create } from "zustand";

// Dog 기본 데이터
export interface Dog {
  id: number; // 강아지 ID
  image: string; // 강아지 이미지 URL
  name: string; // 강아지 이름
  sex: string; // 성별
  isNeutered: boolean; // 중성화 여부
  bod: string; // 생년월일
  breed: string; // 견종
  medication: string; // 복용 중인 약
  lastNoteAt: string; // 마지막 메모 작성일
  lastPicsAt: string; // 마지막 사진 업로드일
  ownerId: 1; // 주인 ID
}

// [center] 강아지 리스트 저장소
interface DogStore {
  dogs: Dog[];
  setDogs: (dogs: Dog[]) => void;
}

export const useDogStore = create<DogStore>((set) => ({
  dogs: [],
  setDogs: (dogs) => set({ dogs }),
}));

// 굳이 필요 없을것 같아서 사용 안함
// 어차피 한 페이지 내에서 추가할 데이터를 여기다 저장할 필요 x
// // [parent] 강아지 정보 입력 저장소
// export const useDogFormStore = create((set) => ({
//   dog: {
//     id: 1,
//     image: "",
//     name: "",
//     Sex: "",
//     isNeutered: false,
//     bod: "",
//     breed: "",
//     medication: "",
//     lastNoteAt: "",
//     lastPicsAt: "",
//     ownerId: 1,
//   },
//   setDog: (dog: Dog) => set({ dog }),
// }));
