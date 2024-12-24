import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import useGetUser from "../hooks/useGetUser";
// import { useSelector } from "react-redux";

const UserProtected = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  // const { user } = useSelector((state) => state.user);
  // const { token } = cooki;
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  // useGetUser();

  useEffect(() => {
    // console.log("cookies", cookies.token);
    if (!cookies.token) {
      setIsLoading(false);
      toast.error("You are not authorized to access this page");
      navigate("/userLogin");
    } else {
      setIsLoading(false);
    }
  }, [cookies.token, navigate]);
  // useGetUser();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
};

export default UserProtected;
