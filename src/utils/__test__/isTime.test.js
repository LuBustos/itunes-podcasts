import { isTimeElapsed } from "../isTime";

test("isTimeElapsed should return true", () => {
  const lastTime = new Date().getTime() - 2000;
  const interval = 2000;

  const result = isTimeElapsed(lastTime, interval);

  expect(result).toBe(true);
});

test("isTimeElapsed should return false", () => {
  const lastTime = new Date().getTime();
  const interval = 2000;

  const result = isTimeElapsed(lastTime, interval);

  expect(result).toBe(false);
});
