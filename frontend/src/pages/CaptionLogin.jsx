import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setCaption } from "../store/slices/userslice";

const CaptionLogin = () => {
  const [captionDetails, setCaptionDetails] = React.useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const form = new FormData();
      form.append("email", captionDetails.email);
      form.append("password", captionDetails.password);

      // form.append("email", userDetails.email);
      // form.append("password", userDetails.password);
      const res = await axios.post(
        `${BASE_URL}/caption/captionLogin`,
        captionDetails,
        {
          header: {
            "Content-Type": "application/json",
            // "Content-Type": "application/json"
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        // caption
        setCaption(res.data.caption);
        toast.success("Caption Login");
        setTimeout(() => {
          navigate("/captain-home");
          setIsLoading(false);
        }, 5000);
        // navigate("/captain-home");
      }
    } catch (error) {
      console.log("error in caption login", error);
      toast.error("error in caption login:", error);
    }
  };
  return (
    <div className=" md:flex items-center justify-center h-screen w-screen ">
      <div className="p-7  flex flex-col h-screen justify-between shadow-lg md:h-auto">
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
            alt=""
            className="w-16 mb-10"
          />
          <form
            onSubmit={(e) => {
              onSubmitHandler(e);
            }}
          >
            <h3 className="text-lg font-meduim mb-2">What's your email</h3>
            <input
              // required
              type="email"
              value={captionDetails.email}
              onChange={(e) => {
                setCaptionDetails({ ...captionDetails, email: e.target.value });
              }}
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'"
            />
            <h3 className="text-lg font-medium mb-2">Enter Password</h3>
            <input
              required
              type="password"
              value={captionDetails.password}
              onChange={(e) => {
                setCaptionDetails({
                  ...captionDetails,
                  password: e.target.value,
                });
              }}
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'"
            />
            <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg  px-4 py-2 w-full text-lg placeholder:text-base">
              {isLoading ? "loading" : "login"}
            </button>
          </form>
          <p className="text-center">
            {" "}
            New here?
            <Link to="/captionSignUp" className="text-blue-600">
              Create new Account
            </Link>
          </p>
        </div>
        <div>
          <Link
            to="/userLogin"
            className="bg-orange-500 flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
          >
            Sign in as User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaptionLogin;
