import axios from "axios";
import appConfig from "./apiConfig";

const axiosInstance = axios.create({
  baseURL: appConfig.apiUrl, // 공통 URL 설정
  headers: {
    "Content-Type": "application/json",
  },
});

// 공통 인스턴스를 export하여 다른 파일에서 import하여 사용
export default axiosInstance;
