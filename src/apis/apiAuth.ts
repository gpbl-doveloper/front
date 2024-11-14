import axios from "axios";
import Constants from "expo-constants";

const appConfig = Constants.expoConfig?.extra;

export const postSignUp = async (idToken: any, data: any) => {
  // error in apiURL
  if (!appConfig || !appConfig.apiUrl) {
    console.error("API_URL이 설정되지 않았습니다.");
    throw new Error("API_URL이 설정되지 않았습니다.");
  }

  try {
    const response = await axios.post("api/auth/signup", data, {
      baseURL: `${appConfig.apiUrl}`,
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Axios error:",
        error.response?.status,
        error.response?.data
      );
    } else {
      console.error("Unknown error:", error);
    }
    throw error;
  }
};
