export const levelColor = (time: number): string => {
  const hours = Math.floor(time / 3600);

  if (hours >= 3) return 'level3';
  if (hours >= 2) return 'level2';

  return 'level1';
};
