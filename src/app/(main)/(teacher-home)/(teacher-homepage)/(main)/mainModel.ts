import { getCenterDogList } from "@/src/apis/apiDogs/get";

// :Promise<Dog[]>
export const getAllDogs = async (idToken: string) => {
  try {
    const result = await getCenterDogList(idToken);
    return result.data.dogsWithStatus;
  } catch (error) {
    console.error("Failed to fetch dogs:", error);
    throw error;
  }
};
