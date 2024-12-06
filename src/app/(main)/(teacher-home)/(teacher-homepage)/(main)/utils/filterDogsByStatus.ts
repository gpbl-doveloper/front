import { DogFromBackend } from "@/src/store/dogStore";
import { DogStatus } from "@/src/store/filterStore";

//필터링 함수
export const filterDogsByStatus = (
  status: DogStatus,
  dogs: DogFromBackend[]
): DogFromBackend[] => {
  switch (status) {
    case DogStatus.ALL:
      return dogs;
    case DogStatus.NOT_STARTED:
      return dogs.filter(
        (dog) => !dog.diaryPhotoStatus && !dog.diaryNoteStatus
      );
    case DogStatus.DRAFT:
      return dogs.filter(
        (dog) =>
          (dog.diaryPhotoStatus && !dog.diaryNoteStatus) ||
          (!dog.diaryPhotoStatus && dog.diaryNoteStatus)
      );
    case DogStatus.SENT:
      return dogs.filter((dog) => dog.diaryPhotoStatus && dog.diaryNoteStatus);
    default:
      return dogs;
  }
};
