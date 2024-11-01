import axios from "axios";

export const getData = async (url: string) => {
  const response = await axios.get(url);
  return response;
};

type ContentType = 'application/json' | 'multipart/form-data';

export const postData = async (
  url: string, 
  data: any, 
  contentType: ContentType = 'application/json'
) => {
  const response = await axios.post(url, data, {
    headers: {
      "Content-Type": contentType,
    },
  });
  return response;
};

// 통신 성공/실패 시 자주 사용하는 알림 함수
export const showSuccessNotification = (message: string) => {
  console.log(message);
  alert(message); // 추후 다른 알림 방식으로 쉽게 변경 가능
};

export const showErrorNotification = (error: unknown, message: string) => {
  console.error(message, error);
  alert(message); // 추후 다른 알림 방식으로 쉽게 변경 가능
};
