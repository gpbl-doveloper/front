import { getCenterList } from "@/src/apis/apiCenters/get";

export const findCenterAPI = async (idToken: string, searchText: string) => {
  const response = await getCenterList(idToken, searchText);
  return response.data.centers;
};
