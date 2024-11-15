import { getDogList } from "@/src/apis/apiDogList";
import { Dog } from "@/src/store/dogStore";

export const getAllDogs = async (
  idToken: string
): Promise<Dog[]> => {
  try {
    const result = await getDogList(idToken);
    console.log(result);
    return result;
  } catch (error) {
    console.error("Failed to fetch dogs:", error);
    throw error;
  }
};
