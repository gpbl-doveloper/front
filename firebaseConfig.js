import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const config = Constants.expoConfig;

// Firebase 구성
const firebaseConfig = {
  apiKey: config.extra.apiKey,
  authDomain: "gpbl-doveloper.firebaseapp.com",
  projectId: "gpbl-doveloper",
  storageBucket: "gpbl-doveloper.appspot.com",
  messagingSenderId: config.extra.messagingSenderId,
  appId: config.extra.appId,
  measurementId: config.extra.measurementId,
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
