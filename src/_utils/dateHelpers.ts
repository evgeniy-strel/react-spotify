export const formatTimeTrack = (ms: number): string => {
  const allSeconds = ms / 1000;
  const min = Math.floor(allSeconds / 60);
  const seconds = Math.floor(allSeconds % 60);

  return `${addZero(min)}:${addZero(seconds)}`;
};

export const addZero = (value: number): string =>
  value >= 10 ? `${value}` : `0${value}`;
