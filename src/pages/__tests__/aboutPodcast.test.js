import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PodcastId from "../about-podcast/index";

jest.mock("../../hooks/useStore", () => ({
  useStore: jest.fn((selector) => ({
    summary: "Podcast summary",
    lastFechtTime: null,
    podcast: null,
    addLastFechTimePodcast: jest.fn(),
    addEpisode: jest.fn(),
    set_loading: jest.fn(),
  })),
}));

jest.mock("../../utils/getData", () => ({
  getData: jest.fn().mockResolvedValue({
    resultCount: 1,
    results: [
      {
        artistName: "Hrishikesh Hirway",
        collectionName: "Song Exploder",
        trackName: "Song Exploder",
        collectionCensoredName: "Song Exploder",
        trackCensoredName: "Song Exploder",
        releaseDate: "2023-05-31T22:00:00Z",
        trackTimeMillis: 1217,
      },
      {
        collectionName: "Song Exploder",
        trackTimeMillis: 1217000,
        releaseDate: "2023-05-31T22:00:00Z",
        trackId: 1000615204826,
        trackName: "Feist - In Lightning",
        description:
          "Feist is a singer/songwriter from Canada. She put out her first solo album in 1999. She’s won 11 Juno awards, including two for Artist of the Year, and she has four Grammy nominations. She’s also been a member of the band Broken Social Scene since 2001.\n\nIn April 2023, Feist put out her sixth album, Multitudes. And for this episode, I talked to her about how she made the opening song from that album, called “In Lightning.”\n\nFor more, visit songexploder.net/feist.",
      },
    ],
  }),
}));

describe("PodcastId", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders podcast details and episode list", async () => {
    render(
      <MemoryRouter initialEntries={["/podcast/123"]}>
        <PodcastId />
      </MemoryRouter>
    );
    await waitFor(() => screen.getByText("Podcast summary"));
    expect(screen.getByText("Podcast summary")).toBeInTheDocument();
    expect(screen.getByText("Episodes: 1")).toBeInTheDocument();
    expect(screen.getAllByText("Title")).toHaveLength(1);
  });
});
