// import React from "react";

const RidePopup = ({
  setRidePopupPanel,
  ride,
  setConfirmRidePopupPanel,
  confirmRide,
}) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          console.log("clicked");
          setRidePopupPanel(false);
        }}
      >
        <i className="text-3xl  text-gray-400      ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>
      <div className="flex justify-between items-center p-3 bg-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3">
          <img
            src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
            className="h-12 rounded-full object-cover w-12"
          />
          <h2 className="text-lg font-medium">
            {ride?.user?.fullName.firstName +
              " " +
              ride?.user.fullName.lastName}
          </h2>
        </div>
        {/* distance  */}
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              {/* <h3 className="text-lg"></h3> */}
              <p className="text-sm -mt-1 text-gray-600">{ride?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              {/* <h3 className="text-lg"></h3> */}
              <p className="text-sm -mt-1 text-gray-600">{ride?.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              {/* <h3 className="text-lg"></h3> */}
              <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>
        <div className="mt-5 w-full">
          <button
            onClick={() => {
              console.log("confirm ride");
              setConfirmRidePopupPanel(true);
              // setRidePopupPanel(false);
              // confirmRide();
            }}
            className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg "
          >
            Confirm
          </button>
          <button
            onClick={() => {
              // setConfirmRidePanelPopupPanel(false);
              console.log("ignore ride");
              setRidePopupPanel(false);
            }}
            className="mt-2 w-full bg-gray-300 text-gray-700 font-semibold p-2 px-10 rounded-lg "
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopup;
