import { getDiary } from "@/src/apis/apiDiary";

export const getDiaryfromAPI = async () => {
  try {
    const result = getDiary({ id: 1, date: "2024-11-15", idToken: "1234" });

    return result;
  } catch (error) {
    console.error(error);
  }
};
