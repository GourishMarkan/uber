import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userslice";
import { toast } from "react-toastify";
const UserLogin = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  // const onChangeHandler = (e) => {
  //   const { name, value } = e.target;
  //   console.log("name", name, value);
  //   console.log(userDetails);
  //   setUserDetails({ ...userDetails, [name]: value });
  // };
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  // console.log("BASE_URL", BASE_URL);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("email", userDetails.email);
      form.append("password", userDetails.password);
      const res = await axios.post(`${BASE_URL}/user/login`, form, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success("User Login Success");
        navigate("/home");
      }
    } catch (error) {
      console.log("error in login", error);
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
              value={userDetails.email}
              onChange={(e) => {
                setUserDetails({ ...userDetails, email: e.target.value });
              }}
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'"
            />
            <h3 className="text-lg font-medium mb-2">Enter Password</h3>
            <input
              required
              type="password"
              value={userDetails.password}
              onChange={(e) => {
                setUserDetails({ ...userDetails, password: e.target.value });
              }}
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'"
            />
            <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg  px-4 py-2 w-full text-lg placeholder:text-base">
              Login
            </button>
          </form>
          <p className="text-center">
            {" "}
            New here?
            <Link to="/userSignUp" className="text-blue-600">
              Create new Account
            </Link>
          </p>
        </div>
        <div>
          <Link
            to="/captionLogin"
            className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
          >
            Sign in as Captain
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
