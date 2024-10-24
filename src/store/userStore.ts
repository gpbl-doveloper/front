import { create } from "zustand";

// 사용자 상태 타입 정의
export interface User {
  name: string;
  email: string | null;
}

export interface UserState {
  user: User | null; // user는 null일 수도 있고 User 타입일 수도 있음
  setUser: (user: User) => void; // 사용자 정보 설정 함수
  resetUser: () => void; // 사용자 정보 리셋 함수
}

export interface RegisterState {
  token: string;
  name: string;
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setToken: (token: string) => void;
  setName: (name: string) => void;
}

// 로그인 후, 유저 정보 저장소
export const useUserStore = create<UserState>((set) => ({
  user: null, // 기본값
  setUser: (user) => set({ user }),
  resetUser: () => set({ user: null }),
}));

//회원가입 시 필요한 데이터 저장소
export const useRegisterStore = create<RegisterState>((set) => ({
  email: "",
  password: "",
  token: "",
  name: "",
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setToken: (token) => set({ token }),
  setName: (name) => set({ name }),
}));
