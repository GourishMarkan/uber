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
import Riding from "./pages/Riding";
import { CaptionHome } from "./pages/CaptionHome";
import CaptionProtected from "./pages/CaptionProtected";
import CaptainRiding from "./pages/CaptainRiding";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { setSocket } from "./store/slices/socketSlice";
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
    path: "/riding",
    element: <Riding />,
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
    path: "/captain-home",
    element: (
      <CaptionProtected>
        <CaptionHome />
      </CaptionProtected>
    ),
  },
  {
    path: "/captain-riding",
    element: (
      <CaptionProtected>
        <CaptainRiding />
      </CaptionProtected>
    ),
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
function App() {
  const { user, caption } = useSelector((state) => state.user);
  // const { socket } = useSelector((state) => state.socketio);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch();
  useEffect(() => {
    if (user || caption) {
      const socketio = io(`${BASE_URL}`);
      dispatch(setSocket(socketio));

      socketio.on("connect", () => {
        console.log("Connected to server");
      });

      return () => {
        socketio.close();
        dispatch(setSocket(null));
      };
    }
    // else if (socket) {
    //   socket.close();
    //   dispatch(setSocket(null));
    // }
  }, [user, dispatch, caption]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
