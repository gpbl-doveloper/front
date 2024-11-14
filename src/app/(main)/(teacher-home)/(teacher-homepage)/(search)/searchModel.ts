export interface RecentSearch {
    id: string;
    name: string;
  }
  
  const initialSearches: RecentSearch[] = [
    { id: "1", name: "Coco" },
    { id: "2", name: "Kellan" },
    { id: "3", name: "Happy" },
  ];
  
  export async function getRecentSearches(): Promise<RecentSearch[]> {
    try {
      // 실제로는 로컬 스토리지나 API 호출이 될 수 있음
      return Promise.resolve(initialSearches);
    } catch (error) {
      console.error('Failed to fetch recent searches:', error);
      throw error;
    }
  }
  
  export async function removeRecentSearch(id: string): Promise<void> {
    try {
      // 실제로는 로컬 스토리지나 API 호출이 될 수 있음
      console.log('Removing search:', id);
    } catch (error) {
      console.error('Failed to remove recent search:', error);
      throw error;
    }
  }
  
  export async function addRecentSearch(name: string): Promise<RecentSearch> {
    try {
      const newSearch: RecentSearch = {
        id: Date.now().toString(),
        name,
      };
      return Promise.resolve(newSearch);
    } catch (error) {
      console.error('Failed to add recent search:', error);
      throw error;
    }
  }