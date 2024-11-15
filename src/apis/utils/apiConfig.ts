import Constants from "expo-constants";

interface AppConfig {
  apiUrl: string;
}

const defaultConfig: AppConfig = {
  apiUrl: "", // 기본값으로 빈 문자열을 할당
};

export const appConfig: AppConfig = {
  ...defaultConfig,
  ...(Constants.expoConfig?.extra || {}),
};

if (!appConfig || !appConfig.apiUrl) {
  console.error("API_URL이 설정되지 않았습니다.");
  throw new Error("API_URL이 설정되지 않았습니다.");
}

export default appConfig;
