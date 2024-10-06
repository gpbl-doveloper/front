import { create } from "zustand";

// 사용자 상태 타입 정의
interface User {
  name: string;
  email: string | null;
}

interface UserState {
  user: User | null; // user는 null일 수도 있고 User 타입일 수도 있음
  setUser: (user: User) => void; // 사용자 정보 설정 함수
  resetUser: () => void; // 사용자 정보 리셋 함수
}

// Zustand 스토어 생성
const useUserStore = create<UserState>((set) => ({
  user: null, // 기본값
  setUser: (user) => set({ user }), // 사용자 정보 설정 함수
  resetUser: () => set({ user: null }), // 사용자 정보 리셋 함수
}));

export default useUserStore;
