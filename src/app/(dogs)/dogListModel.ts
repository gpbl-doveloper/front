import {getParentDogList} from "../../apis/apiDogs/get";

export const getParentDogListAPI = async (idToken: string) => {
    try {
        const result = await getParentDogList(idToken)
        return result.data.dogs
    } catch (error) {
        console.log(error)
    }
}