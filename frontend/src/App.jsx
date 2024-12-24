// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignUp from "./pages/UserSignUp";
import CaptionLogin from "./pages/CaptionLogin";

import CaptionRegister from "./pages/CaptionRegister";
import UserProtected from "./pages/UserProtected";
import Home from "./pages/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      // element: <Outlet />,
      element: <Start />,
      // children: [
      //   {
      //     path: "/start",
      //     element: <Start />,
      //   },
    },
    {
      path: "/userLogin",
      element: <UserLogin />,
    },
    {
      path: "/userSignUp",
      element: <UserSignUp />,
    },
    {
      path: "/captionLogin",
      element: <CaptionLogin />,
    },
    {
      path: "/captionSignUp",
      element: <CaptionRegister />,
    },
    {
      path: "/start",
      element: <Start />,
    },
    {
      path: "/home",
      element: (
        <UserProtected>
          <Home />
        </UserProtected>
      ),
    },
    // ],
    // },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
