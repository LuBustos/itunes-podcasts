import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/index";
import { Podcasts,AboutPodcast } from "../pages/";

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
      }
    ],
  },
]);
