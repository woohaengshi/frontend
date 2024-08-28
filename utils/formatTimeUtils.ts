export const formatTime = (time: number) => {
  if (typeof time !== 'number') {
    return '00:00';
  }
  const hours = String(Math.floor(time / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
  const seconds = String(time % 60).padStart(2, '0');
  return time >= 3600 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
};

export const getCurrentDate = () => {
  const today = new Date();
  console.log('오늘: ', today);
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
  const day = String(today.getDate() - (today.getHours() < 5 ? 1 : 0)).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
