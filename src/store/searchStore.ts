import { create } from "zustand";

export interface SearchItem {
  id: string;
  name: string;
}

interface SearchStore {
  recentSearches: SearchItem[];
  addSearch: (name: string) => void;
  removeSearch: (id: string) => void;
  clearSearches: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  recentSearches: [
    { id: "1", name: "Coco" },
    { id: "2", name: "Kellan" },
    { id: "3", name: "Happy" },
  ],

  addSearch: (name) =>
    set((state) => {
      // 현재 상태에서 최대 id 값을 찾아서 1 증가시키기
      const nextId =
        state.recentSearches.length > 0
          ? (
              Math.max(
                ...state.recentSearches.map((item) => parseInt(item.id))
              ) + 1
            ).toString()
          : "1";

      const newSearchItem = { id: nextId, name };

      return {
        recentSearches: [...state.recentSearches, newSearchItem],
      };
    }),

  removeSearch: (id) =>
    set((state) => ({
      recentSearches: state.recentSearches.filter((item) => item.id !== id),
    })),

  clearSearches: () =>
    set(() => ({
      recentSearches: [],
    })),
}));
