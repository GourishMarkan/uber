import axios from "axios";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

const UserSignUp = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();
  const onChangeHandler = (e) => {
    // const { name, value } = e.target;
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", userDetails.email);
      formData.append("firstName", userDetails.firstName);
      formData.append("lastName", userDetails.lastName);
      formData.append("password", userDetails.password);

      const res = await axios.post(`${BASE_URL}/user/register`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentails: true,
      });
      if (res.data.success) {
        // dispatch(setUser(res.data.user));
        navigate("/userLogin");
      }
    } catch (error) {
      console.log("error in signup", error);
    }
  };
  console.log("inside user signup");
  return (
    <div className="md:flex items-center justify-center h-screen w-screen ">
      <div className="p-7 h-screen flex flex-col justify-between shadow-md md:h-auto">
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
            alt=""
            className="w-16 mb-10"
          />
          <form
            action=""
            onSubmit={(e) => {
              onSubmitHandler(e);
            }}
          >
            <h3 className="text-lg w-1/2  font-medium mb-2">
              What's your name
            </h3>
            <div className="flex gap-4 mb-7">
              <input
                required
                type="text"
                name="firstName"
                value={userDetails.firstName}
                onChange={onChangeHandler}
                placeholder="First name"
                className="bg-gray-200 rounded-lg py-2 px-4 border w-full text-lg placeholder:text-base"
              />
              {/* <hr /> */}
              <input
                type="text"
                name="lastName"
                value={userDetails.lastName}
                placeholder="Last name"
                className="bg-gray-200  rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
                onChange={onChangeHandler}
              />
            </div>
            <h3 className="text-lg w-1/2 font-medium mb-2">
              What's your email
            </h3>
            <input
              required
              className="bg-gray-200 rounded-lg py-2 px-4 border w-full text-lg placeholder:text-base"
              placeholder="John@email.com"
              name="email"
              value={userDetails.email}
              onChange={onChangeHandler}
              type="email"
            />
            <h3 className="text-lg w-1/2 font-medium mb-2">Enter Password</h3>
            <input
              required
              type="password"
              name="password"
              value={userDetails.password}
              onChange={onChangeHandler}
              className="bg-gray-200 mb-7 rounded-lg py-2 px-4 border w-full text-lg placeholder:text-base"
            />
            <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
              Create account
            </button>
          </form>
          <p className="text-center">
            Already have a account?{" "}
            <Link to="/userLogin" className="text-blue-600">
              Login here
            </Link>
          </p>
        </div>
        <div>
          <p className="text-[10px] leading-tight">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline">Google Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;
