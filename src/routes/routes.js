import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/index";
import { Podcasts } from "../pages/";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Podcasts />,
      },
    ],
  },
]);
