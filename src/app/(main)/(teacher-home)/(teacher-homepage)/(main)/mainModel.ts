import {getCenterDogList} from "@/src/apis/apiDogs/get";
import {Dog, DogFromBackend} from "@/src/store/dogStore";

// :Promise<Dog[]>
export const getAllDogs = async (idToken: string) => {
    try {
        const result = await getCenterDogList(idToken);
        console.log("do999 : ", result.data.dogsWithStatus);
        return result.data.dogsWithStatus;
    } catch (error) {
        console.error("Failed to fetch dogs:", error);
        throw error;
    }
};
