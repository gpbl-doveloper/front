import { getDogList } from "@/src/apis/apiDogList";
import { Dog, DogFromBackend } from "@/src/store/dogStore";

// :Promise<Dog[]>
export const getAllDogs = async (idToken: string) => {
  try {
    const result = await getDogList(idToken);
    console.log(result);
    return dogExample;
  } catch (error) {
    console.error("Failed to fetch dogs:", error);
    throw error;
  }
};

const dogExample: DogFromBackend[] = [
  {
    id: 1,
    img: "",
    name: "billy",
    sex: "Female",
    isNeutered: true,
    bod: "2022-08-09T00:00:00.000Z",
    breed: "retriever",
    medication: "",
    lastNoteAt: null,
    lastPicsAt: null,
    ownerId: 1,
    diaryNoteId: 0,
    diaryPhotoId: 0,
    photoLength: 0,
    diaryNoteStatus: 0,
    diaryPhotoStatus: 0,
  },
  {
    id: 2,
    img: "",
    name: "max",
    sex: "Male",
    isNeutered: false,
    bod: "2021-05-20T00:00:00.000Z",
    breed: "bulldog",
    medication: "Allergy pills",
    lastNoteAt: "2024-11-13T08:30:00.000Z",
    lastPicsAt: "2024-11-13T08:45:00.000Z",
    ownerId: 2,
    diaryNoteId: 1,
    diaryPhotoId: 1,
    photoLength: 5,
    diaryNoteStatus: 2,
    diaryPhotoStatus: 2,
  },
  {
    id: 3,
    img: "",
    name: "bella",
    sex: "Female",
    isNeutered: true,
    bod: "2020-12-15T00:00:00.000Z",
    breed: "poodle",
    medication: "",
    lastNoteAt: "2024-11-13T09:00:00.000Z",
    lastPicsAt: null,
    ownerId: 3,
    diaryNoteId: 2,
    diaryPhotoId: 0,
    photoLength: 0,
    diaryNoteStatus: 1,
    diaryPhotoStatus: 0,
  },
  {
    id: 4,
    img: "",
    name: "charlie",
    sex: "Male",
    isNeutered: true,
    bod: "2019-07-25T00:00:00.000Z",
    breed: "beagle",
    medication: "Heartworm prevention",
    lastNoteAt: null,
    lastPicsAt: "2024-11-13T10:15:00.000Z",
    ownerId: 4,
    diaryNoteId: 0,
    diaryPhotoId: 3,
    photoLength: 3,
    diaryNoteStatus: 0,
    diaryPhotoStatus: 1,
  },
  {
    id: 5,
    img: "",
    name: "lucy",
    sex: "Female",
    isNeutered: false,
    bod: "2023-03-12T00:00:00.000Z",
    breed: "chihuahua",
    medication: "",
    lastNoteAt: null,
    lastPicsAt: null,
    ownerId: 5,
    diaryNoteId: 0,
    diaryPhotoId: 0,
    photoLength: 0,
    diaryNoteStatus: 0,
    diaryPhotoStatus: 0,
  },
];
