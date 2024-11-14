import { create } from "zustand";

// 사용자 상태 타입 정의
export interface User {
  id: number;
  name: string;
  role: "PARENT" | "TEACHER"; // 유저의 역할
  email: string | null;
}

export interface UserState {
  user: User | null; // user는 null일 수도 있고 User 타입일 수도 있음
  setUser: (user: User) => void; // 사용자 정보 설정 함수
  resetUser: () => void; // 사용자 정보 리셋 함수
}
export const useUserStore = create<UserState>((set) => ({
  user: null, // 기본값
  setUser: (user) => set({ user }),
  resetUser: () => set({ user: null }),
}));

export interface AuthState {
  email: string;
  password: string;
  token: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setToken: (token: string) => void;
}

// 로그인 후, 유저 정보 저장소
export const useAuthStore = create<AuthState>((set) => ({
  email: "",
  password: "",
  token: "",
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setToken: (token) => set({ token }),
}));
