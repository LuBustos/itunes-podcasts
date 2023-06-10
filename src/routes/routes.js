import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/index";
import { Podcasts,AboutPodcast,Episode } from "../pages/";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Podcasts />,
      },
      {
        path: "/podcast/:id",
        element: <AboutPodcast />
      },
      {
        path: "/podcast/:id/episode/:id",
        element: <Episode />
      }
    ],
  },
]);
