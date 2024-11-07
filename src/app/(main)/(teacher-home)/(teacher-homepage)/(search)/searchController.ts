import { useNavigation } from "expo-router";
import {
  RecentSearch,
  getRecentSearches,
  removeRecentSearch,
  addRecentSearch,
} from "./searchModel";


export class SearchController {
  async getSearches(): Promise<RecentSearch[]> {
    try {
      return await getRecentSearches();
    } catch (error) {
      console.error("Controller: Failed to fetch searches:", error);
      throw error;
    }
  }

  async removeSearch(id: string): Promise<void> {
    try {
      await removeRecentSearch(id);
    } catch (error) {
      console.error("Controller: Failed to remove search:", error);
      throw error;
    }
  }

  async addSearch(name: string): Promise<RecentSearch> {
    try {
      return await addRecentSearch(name);
    } catch (error) {
      console.error("Controller: Failed to add search:", error);
      throw error;
    }
  }
}
