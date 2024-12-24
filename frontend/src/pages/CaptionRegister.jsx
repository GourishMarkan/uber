import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CaptionRegister = () => {
  const [captionDetails, setCaptionDetails] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    vehicleType: "",
    vehicleColor: "",
    vehiclePlate: "",
    vehicleCapacity: 0,
  });

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setCaptionDetails({
      ...captionDetails,
      [name]: name === "vehicleCapacity" ? Number(value) : value,
    });
  };
  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("captionDetails", captionDetails);
      const formData = new FormData();
      formData.append("firstName", captionDetails.firstName);
      formData.append("lastName", captionDetails.lastName);
      formData.append("email", captionDetails.email);
      formData.append("password", captionDetails.password);
      formData.append("color", captionDetails.vehicleColor);
      formData.append("plate", captionDetails.vehiclePlate);
      formData.append("capacity", Number(captionDetails.vehicleCapacity));
      formData.append("vehicleType", captionDetails.vehicleType);
      const res = await axios.post(
        `${BASE_URL}/caption/captionRegister`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success("Caption Register Success");
        navigate("/captionLogin");
      }
    } catch (error) {
      console.log("error in caption register", error);
      toast.error("error in caption register", error);
    }
  };
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
                value={captionDetails.firstName}
                onChange={onChangeHandler}
                placeholder="First name"
                className="bg-gray-200 rounded-lg py-2 px-4 border w-full text-lg placeholder:text-base"
              />
              {/* <hr /> */}
              <input
                type="text"
                name="lastName"
                value={captionDetails.lastName}
                placeholder="Last name"
                className="bg-gray-200  rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
                onChange={onChangeHandler}
              />
            </div>
            <h3 className="text-lg  font-medium mb-2">What's your email</h3>
            <input
              required
              className="bg-gray-200 rounded-lg py-2 px-4 border w-full text-lg placeholder:text-base"
              placeholder="John@email.com"
              name="email"
              value={captionDetails.email}
              onChange={onChangeHandler}
              type="email"
            />
            <h3 className="text-lg  font-medium mb-2">Enter Password</h3>
            <input
              required
              type="password"
              name="password"
              placeholder="Password"
              value={captionDetails.password}
              onChange={onChangeHandler}
              className="bg-gray-200 mb-7 rounded-lg py-2 px-4 border w-full text-lg placeholder:text-base"
            />
            <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
            <div className="flex gap-4 mb-7">
              <input
                required
                className="bg-gray-200 w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base "
                value={captionDetails.vehicleColor}
                name="vehicleColor"
                onChange={onChangeHandler}
                type="text"
                placeholder="Vehicle Color"
              />
              <input
                required
                className="bg-gray-200 px-4 py-2 w-1/2 rounded-lg border text-lg placeholder:text-base "
                name="vehiclePlate"
                type="text"
                value={captionDetails.vehiclePlate}
                onChange={onChangeHandler}
                placeholder="Vehicle Plate"
              />
            </div>
            <div className="flex gap-4 mb-7">
              <input
                required
                type="number"
                className="bg-gray-200 w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base "
                value={captionDetails.vehicleCapacity}
                name="vehicleCapacity"
                onChange={(e) => {
                  setCaptionDetails({
                    ...captionDetails,
                    vehicleCapacity: Number(e.target.value),
                  });
                }}
                placeholder="Vehicle Capacity"
              />
              <select
                required
                className="bg-gray-200 px-4 py-2 w-1/2 rounded-lg border text-lg placeholder:text-base "
                name="vehicleType"
                // type="text"
                value={captionDetails.vehicleType}
                onChange={onChangeHandler}
                // placeholder="Vehicle Plate"
              >
                <option value="" disabled>
                  Select Vehicle Type
                </option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
              </select>
            </div>
            <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
              Create Caption account
            </button>
          </form>
          <p className="text-center">
            Already have a account?{" "}
            <Link to="/captionLogin" className="text-blue-600">
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

export default CaptionRegister;
