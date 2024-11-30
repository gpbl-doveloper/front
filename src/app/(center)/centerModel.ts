import { CenterDetails, postCenterInfo } from "@/apis/apiCenters/post";

export const postCenterInfoAPI = async (
  idToken: string,
  centerDetails: CenterDetails
) => {
  try {
    const result = await postCenterInfo(idToken, centerDetails);
    return result.data;
  } catch (error) {
    console.error("postCenterInfoAPI error : ", error);
    throw error;
  }
};
