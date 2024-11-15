import { create } from "zustand";

// 사용자 상태 타입 정의
export interface User {
  id: number;
  uid: string; // Firebase Auth의 uid
  name: string;
  role: "PARENT" | "TEACHER"; // 유저의 역할
  email: string;
  phone: string;
  centerId: number | null;
  createdAt: string;
}

// [center, parent] 로그인 후 회원 정보 저장소
export interface UserState {
  user: User | null; // user는 null일 수도 있고 User 타입일 수도 있음
  setUser: (user: User) => void; // 사용자 정보 설정 함수
  resetUser: () => void; // 사용자 정보 리셋 함수
}
export const useUserStore = create<UserState>((set) => ({
  user: {
    id: 0,
    uid: "",
    name: "",
    role: "PARENT",
    email: "",
    phone: "",
    centerId: null,
    createdAt: "",
  }, // 기본값
  setUser: (user) => set({ user }),
  resetUser: () => set({ user: null }),
}));

// [center, parent] 로그인 후 Firebase idToken 저장소
export interface FirebaseUser {
  idToken: string;
  setIdToken: (idToken: string) => void;
}
export const useFirebaseAuth = create<FirebaseUser>((set) => ({
  idToken: "", // Firebase Auth의 user 정보
  setIdToken: (idToken: string) => set({ idToken }), // Firebase Auth의 user 정보 설정 함수
}));

// [center, parent] 회원가입 시 입력할 정보 저장소
export interface AuthState {
  email: string;
  password: string;
  token: string;
  name: string;
  phone: string;
  role: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setToken: (token: string) => void;
  setName: (name: string) => void;
  setPhone: (phone: string) => void;
  setRole: (role: string) => void;
}

// 로그인 후, 유저 정보 저장소
export const useAuthStore = create<AuthState>((set) => ({
  email: "",
  password: "",
  token: "",
  name: "",
  phone: "",
  role: "",
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setToken: (token) => set({ token }),
  setName: (name) => set({ name }),
  setPhone: (phone) => set({ phone }),
  setRole: (role) => set({ role }),
}));
