export const isTimeElapsed = (lastTime, interval) => {
  const currentTime = new Date().getTime();
  return currentTime - lastTime >= interval;
};
