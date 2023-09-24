import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/home";
import Creat from "./pages/create";
import Nftdetail from "./pages/nftdetail/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [{}],
  },
  {
    path: "/create",
    element: <Creat />,
    children: [{}],
  },
  {
    path: "/nftdetail",
    element: <Nftdetail />,
    children: [{}],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
