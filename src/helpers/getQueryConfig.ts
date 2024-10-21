export const queryConfig = {
  staleTime: 5 * 60 * 1000,
  cacheTime: 30 * 60 * 1000,
  retry: 3,
  retryDelay: (attemptIndex: number) =>
    Math.min(1000 * 2 ** attemptIndex, 30000),
};
