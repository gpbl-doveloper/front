// /utils/fetch/delayedFetch.ts
export const fetchWithDelay = async <T>(
  fetchFn: () => Promise<T>,
  delay: number = 600
): Promise<T> => {
  const [_, data] = await Promise.all([
    new Promise((resolve) => setTimeout(resolve, delay)),
    fetchFn(),
  ]);

  return data;
};
