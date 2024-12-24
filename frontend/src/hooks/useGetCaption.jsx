import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCaption } from "../store/slices/userslice";

const useGetCaption = () => {
  const dispatch = useDispatch();
  const { caption } = useSelector((state) => state.user);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  React.useEffect(() => {
    const getCaption = async () => {
      try {
        const res = await axios.get(`${BASE_URL}.api/v1/caption/me`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setCaption(res.data.caption));
        }
      } catch (error) {
        console.log("caption not found", error);
      }
    };
    getCaption();
  }, [caption]);
};

export default useGetCaption;
