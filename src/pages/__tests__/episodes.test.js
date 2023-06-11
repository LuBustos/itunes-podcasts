import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import EpisodeId from "../episodes/index";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock("../../hooks/useStore", () => ({
  useStore: jest.fn((selector) => ({
    podcast_detail: {
      artworkUrl30: "image.jpg",
    },
    summary: "Podcast summary",
    podcast_description: "Podcast description",
    song: "podcast-song-url.mp3",
    podcast_title: "Podcast title",
  })),
}));

describe("EpisodeId with data", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders podcast details and card content", async () => {
    render(<EpisodeId />);
    await waitFor(() => screen.getByText("Podcast title"));
    expect(screen.getByText("Podcast title")).toBeInTheDocument();
    expect(screen.getByText("Podcast description")).toBeInTheDocument();
    expect(screen.getByTestId("episode-song")).toBeInTheDocument();
  });

  test("calls navigate(-1) when clicking on back", async () => {
    render(<EpisodeId />);
    await waitFor(() => screen.getByText("Podcast title"));

    const backButton = screen.getByText("Podcast title");
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
