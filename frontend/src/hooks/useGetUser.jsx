import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/slices/userslice";

const useGetUser = () => {
  const { user } = useSelector((state) => state.user);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/me`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setUser(res.data.user));
        }
      } catch (error) {
        console.error("error", error);
      }
    };
    getUser();
  }, [user]);
};

export default useGetUser;
