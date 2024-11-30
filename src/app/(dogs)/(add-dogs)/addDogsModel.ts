import { postParentDog, PostParentDogProps } from "../../../apis/apiDogs/post";

// 부모 강아지 등록 API
export const postParentDogAPI = async (
  idToken: string,
  photoUris: string[],
  dogDetails: PostParentDogProps
) => {
  try {
    const result = await postParentDog(idToken, photoUris, dogDetails);
    return result;
  } catch (error) {
    throw error; // 에러를 상위로 전파
  }
};
