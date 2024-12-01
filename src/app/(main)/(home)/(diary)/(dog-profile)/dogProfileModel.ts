import { putParentDog, UpdateUserDogProps } from "@/src/apis/apiDogs/put";

export const editDogProfileAPI = async (
  idToken: string,
  dogId: number,
  dogDetails: UpdateUserDogProps
) => {
  try {
    const response = await putParentDog(idToken, dogId, dogDetails);
    return response;
  } catch (error) {
    console.error("Error updating dog info:", error);
  }
};
