import axios from "axios";
import { getData } from "../getData";

test("getData should fetch data from itunes", async () => {
  const mockData = { example: "data" };
  const mockUrl =
    "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";
  axios.get = jest.fn().mockResolvedValueOnce({ data: mockData });

  const result = await getData(mockUrl);

  expect(result).toEqual(mockData);
  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(axios.get).toHaveBeenCalledWith(mockUrl);
});
