import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Podcasts from "../podcasts";

const mockNavigate = jest.fn();
const mockSetSummary = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock("../../hooks/useStore", () => ({
  useStore: jest.fn((selector) => ({
    set_summary: mockSetSummary,
    set_loading: jest.fn(),
    clear: jest.fn(),
  })),
}));

jest.mock("../../utils/getData", () => ({
  getData: jest.fn().mockResolvedValue({
    feed: {
      entry: [
        {
          "im:name": {
            label: "The Joe Budden Podcast",
          },
          "im:image": [
            {
              label:
                "https://is3-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/55x55bb.png",
              attributes: {
                height: "55",
              },
            },
            {
              label:
                "https://is5-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/60x60bb.png",
              attributes: {
                height: "60",
              },
            },
            {
              label:
                "https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/170x170bb.png",
              attributes: {
                height: "170",
              },
            },
          ],
          summary: {
            label: "Summary 1",
          },
          "im:price": {
            label: "Get",
            attributes: {
              amount: "0",
              currency: "USD",
            },
          },
          "im:contentType": {
            attributes: {
              term: "Podcast",
              label: "Podcast",
            },
          },
          rights: {
            label: "© All rights reserved",
          },
          title: {
            label: "The Joe Budden Podcast - The Joe Budden Network",
          },
          link: {
            attributes: {
              rel: "alternate",
              type: "text/html",
              href: "https://podcasts.apple.com/us/podcast/the-joe-budden-podcast/id1535809341?uo=2",
            },
          },
          id: {
            label:
              "https://podcasts.apple.com/us/podcast/the-joe-budden-podcast/id1535809341?uo=2",
            attributes: {
              "im:id": "1",
            },
          },
          "im:artist": {
            label: "The Joe Budden Network",
            attributes: {
              href: "https://podcasts.apple.com/us/artist/the-joe-budden-network/1535844019?uo=2",
            },
          },
        },
      ],
    },
  }),
}));

describe("Podcasts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state and then podcasts", async () => {
    render(<Podcasts />);

    await waitFor(() => screen.getByText("The Joe Budden Podcast"));
    expect(screen.getByTestId("total-podcasts", 1)).toBeTruthy();
  });

  test("calls set_summary and navigate when clicking on podcast", async () => {
    render(<Podcasts />);
    await waitFor(() => screen.getByText("The Joe Budden Podcast"));

    const podcast1 = screen.getByText("The Joe Budden Podcast");
    fireEvent.click(podcast1);

    expect(mockSetSummary).toHaveBeenCalledWith("Summary 1");
    expect(mockNavigate).toHaveBeenCalledWith("/podcast/1");
  });
});
