import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// 알림장 목록 불러오기
export const getDiaryList = async (): Promise<any> => {
  try {
    const response = await axios.get("/diary/all", {
      baseURL: API_URL,
      headers: {
        // Authorization: `Bearer your-token`, // 필요한 경우 인증 토큰 추가
        "Content-Type": "application/json",
      },
    });
    // 응답 데이터 처리
    return response.data;
  } catch (error) {
    // 오류 처리
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
    throw error; // 필요에 따라 오류를 던져서 상위 호출부에서 처리
  }
};

// 특정 알림장 조회
export const getDiaryListByID = async (id: string): Promise<any> => {
  try {
    const response = await axios.get(`/diary/${id}`, {
      baseURL: API_URL,
      headers: {
        // Authorization: `Bearer your-token`, // 필요한 경우 인증 토큰 추가
        "Content-Type": "application/json",
      },
    });
    // 응답 데이터 처리
    return response.data;
  } catch (error) {
    // 오류 처리
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
    throw error; // 필요에 따라 오류를 던져서 상위 호출부에서 처리
  }
};

// 알림장 작성
export const createDiary = async (data: any): Promise<any> => {
  try {
    const response = await axios.post("/diary/add", data, {
      baseURL: API_URL,
      headers: {
        // Authorization: `Bearer your-token`, // 필요한 경우 인증 토큰 추가
        "Content-Type": "application/json",
      },
    });
    // 응답 데이터 처리
    return response.data;
  } catch (error) {
    // 오류 처리
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
    throw error; // 필요에 따라 오류를 던져서 상위 호출부에서 처리
  }
};
