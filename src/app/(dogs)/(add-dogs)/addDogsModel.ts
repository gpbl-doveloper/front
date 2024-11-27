import { postParentDog, PostParentDogProps } from "../../../apis/apiDogs/post";

// 부모 강아지 등록 API
export const postParentDogAPI = async (
  idToken: string,
  photoUris: string[],
  dogDetails: PostParentDogProps
) => {
  try {
    console.log("photoUris", photoUris);
    console.log("dogDetails", dogDetails);
    const result = await postParentDog(idToken, photoUris, dogDetails);
    console.log("result", result);
    return result;
  } catch (error) {
    console.log(error);
  }
};
