export const DOG_STATUS = {
  ALL: "All",  // 추가
  NOT_STARTED: "Not Started",
  DRAFT: "Draft",
  SENT: "Sent",
  MEDICINE: "Medicine"
} as const;

export type DogStatus = typeof DOG_STATUS[keyof typeof DOG_STATUS];

export interface Dog {
  id: string;
  name: string;
  status: Exclude<DogStatus, typeof DOG_STATUS.ALL>;  // ALL은 실제 상태가 아님
}

// 임시 데이터
export const dogs: Dog[] = [
  { id: "1", name: "Dog Name", status: DOG_STATUS.NOT_STARTED },
  { id: "2", name: "Dog Name", status: DOG_STATUS.NOT_STARTED },
  { id: "3", name: "Dog Name", status: DOG_STATUS.DRAFT },
  { id: "4", name: "Dog Name", status: DOG_STATUS.SENT },
  { id: "5", name: "Dog Name", status: DOG_STATUS.MEDICINE },
];

export function getAllDogs(): Promise<Dog[]> {
  try {
    return Promise.resolve(dogs);
  } catch (error) {
    console.error('Failed to fetch dogs:', error);
    throw error;
  }
}

export function getDogsByStatus(status: DogStatus): Promise<Dog[]> {
  try {
    if (status === DOG_STATUS.ALL) {
      return getAllDogs();
    }
    const filteredDogs = dogs.filter((dog) => dog.status === status);
    return Promise.resolve(filteredDogs);
  } catch (error) {
    console.error('Failed to fetch dogs by status:', error);
    throw error;
  }
}

export function getStatusOptions(): DogStatus[] {
  return Object.values(DOG_STATUS);
}