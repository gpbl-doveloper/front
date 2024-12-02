import { putUserData } from "@/src/apis/apiUsers/put";

export const editProfileAPI = async (idToken: string, editingUser: any) => {
  try {
    const response = await putUserData(idToken, editingUser);
    return response;
  } catch (error) {
    console.error("Error updating user info:", error);
  }
};
