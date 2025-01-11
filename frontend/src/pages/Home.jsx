import { useEffect, useRef, useState } from "react";
import "remixicon/fonts/remixicon.css";
import useGetUser from "../hooks/useGetUser";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import { useNavigate } from "react-router-dom";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

import { toast } from "react-toastify";
import axios from "axios";
import useDebounce from "../hooks/useDebouce";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "../store/slices/socketSlice";
import { io } from "socket.io-client";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmPanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);

  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  const navigate = useNavigate();
  useGetUser();
  const { user } = useSelector((state) => state.user);
  // const { socket } = useSelector((state) => state.socketio);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const debouncedPickup = useDebounce(pickup, 500);
  const debouncedDestination = useDebounce(destination, 500);

  const { socket } = useSelector((state) => state.socketio);
  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);

  socket.on("ride-confirmed", (ride) => {
    setVehicleFound(false);
    setWaitingForDriver(true);
    setRide(ride);
  });
  useEffect(() => {
    if (debouncedPickup) {
      // checking if active field is pickup or destination
      //  activeField === pickup ? handlePickUpChange(pic) : "destination";
      handlePickupChange(debouncedPickup);
    }
    // if (debouncedDestination) {
    //   handleDestinationChange(debouncedDestination);
    // }
  }, [debouncedPickup]);
  useEffect(() => {
    // if (debouncedPickup) {
    //   // checking if active field is pickup or destination
    //   //  activeField === pickup ? handlePickUpChange(pic) : "destination";
    //   handlePickupChange(debouncedPickup);
    // }
    if (debouncedDestination) {
      handleDestinationChange(debouncedDestination);
    }
  }, [debouncedDestination]);

  // const { user } = useSelector((state) => state.user);
  // const BASE_URL = import.meta.env.VITE_BASE_URL;
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (user) {
  //     const socketio = io(`${BASE_URL}`);
  //     dispatch(setSocket(socketio));

  //     socketio.on("connect", () => {
  //       console.log("Connected to server");
  //     });

  //     // return () => {
  //     //   socketio.close();
  //     //   dispatch(setSocket(null));
  //     // };
  //   } else if (socket) {
  //     socket.close();
  //     dispatch(setSocket(null));
  //   }
  // }, [user, dispatch]);
  const handlePickupChange = async (pickup) => {
    // setPickup(e.target.value);
    // console.log("pickup", pickup);
    if (pickup.length >= 3) {
      try {
        const res = await axios.get(`${BASE_URL}/maps/get-suggestions`, {
          // params: { input: pickup },
          params: { input: pickup },
          withCredentials: true,
        });
        if (res.data.success) {
          setPickupSuggestions(res.data.suggestions);
        }
      } catch (error) {
        console.log("error in handlePickupChange", error);
        toast.error("error in handlePickupChange", error);
        setPickupSuggestions([]);
      }
    }
  };
  // function for destination fetch
  const fetchDestination = async (destination) => {
    try {
      const res = await axios.get(`${BASE_URL}/maps/get-suggestions`, {
        // params: { input: pickup },
        params: { input: destination },
        withCredentials: true,
      });
      if (res.data.success) {
        setDestinationSuggestions(res.data.suggestions);
      }
    } catch (error) {
      console.log("error in handleDestinationChange", error);
      toast.error("error in handleDestinationChange", error);
      setDestinationSuggestions([]);
    }
  };
  const handleDestinationChange = async (destination) => {
    // setDestination(e.target.value);
    if (destination.length >= 3) {
      fetchDestination(destination);
    }
  };
  // find trip animate
  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 24,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  // vehicle panel animate
  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else if (!vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  // confirm panel animate
  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );
  // vehicle found animate
  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );
  // waiting for driver animate
  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  const submitHandler = async (e) => {
    e.preventDefault();
  };

  const findTrip = async () => {
    setVehiclePanel(true);
    setPanelOpen(false);
    try {
      const res = await axios.get(`${BASE_URL}/rides/get-fare`, {
        params: {
          pickup,
          destination,
        },
        withCredentials: true,
      });
      setFare(res.data.fare);
    } catch (error) {
      console.log("error in findTrip", error);
      toast.error("error in findTrip", error);
      setFare({});
    }
  };

  const createRide = async () => {
    try {
      await axios.post(
        `${BASE_URL}/rides/createRide`,
        {
          pickup,
          destination,

          vehicleType,
        },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log("error in createRide", error);
      toast.error("error in createRide", error);
    }
  };
  return (
    <div className="md:flex  md:items-center md:justify-center h-screen w-screen ">
      <div className="  flex  flex-col items-center justify-center h-screen w-screen ">
        <div className="h-full relative overflow-hidden shadow-sm border">
          <img
            className="w-16 absolute left-5 top-5 "
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt=""
          />
          <div className="h-screen w-screen">{/* image  */}</div>
          <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
            <div className="h-1/3 p-6 bg-white relative">
              <h5
                ref={panelCloseRef}
                onClick={() => {
                  setPanelOpen(false);
                }}
                className="absolute opacity-0 right-6 top-6 text-2xl"
              >
                <i className="ri-arrow-down-wide-line"></i>
              </h5>
              <h4 className="text-2xl font-semibold">Find a trip</h4>
              <form
                className="relative py-3"
                onSubmit={(e) => submitHandler(e)}
              >
                <div className="line absolute h-16 w-1 top-1/2 -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
                <input
                  onClick={() => {
                    setPanelOpen(true);
                    setActiveField("pickup");
                  }}
                  type="text"
                  // onChange={handlePickupChange}
                  onChange={(e) => setPickup(e.target.value)}
                  value={pickup}
                  className="bg-gray-200 px-12 py-2 text-lg  rounded-lg w-full"
                  placeholder="Add a pick-up location"
                />
                <input
                  onClick={() => {
                    setPanelOpen(true);
                    setActiveField("destination");
                  }}
                  type="text"
                  value={destination}
                  // onChange={handleDestinationChange}
                  onChange={(e) => setDestination(e.target.value)}
                  className="bg-gray-200 px-12 py-2 text-lg  rounded-lg w-full mt-3"
                  placeholder="Enter your destination"
                />
              </form>
              <button
                onClick={findTrip}
                className="bg-black text-white px-4 py02 rounded-lg mt-3 w-full"
              >
                Find Trip
              </button>
            </div>
            <div className="bg-white h-0 " ref={panelRef}>
              <LocationSearchPanel
                suggestions={
                  activeField === "pickup"
                    ? pickupSuggestions
                    : destinationSuggestions
                }
                setPickup={setPickup}
                setDestination={setDestination}
                activeField={activeField}
              />
            </div>
          </div>
          <div
            ref={vehiclePanelRef}
            className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
          >
            <VehiclePanel
              setVehiclePanel={setVehiclePanel}
              fare={fare}
              selectVehicle={setVehicleType}
              setConfirmPanel={setConfirmRidePanel}
              // activeField={pickup}
            />
          </div>
          <div
            ref={confirmPanelRef}
            className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
          >
            {/* <VehiclePanel /> */}
            <ConfirmRide
              pickup={pickup}
              destination={destination}
              fare={fare}
              vehicleType={vehicleType}
              setConfirmRidePanel={setConfirmRidePanel}
              setVehicleFound={setVehicleFound}
              createRide={createRide}
            />
          </div>
          <div
            ref={vehicleFoundRef}
            className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
          >
            <LookingForDriver
              pickup={pickup}
              destination={destination}
              fare={fare}
              vehicleType={vehicleType}
              setVehicleFound={setVehicleFound}
            />
          </div>
          <div
            ref={waitingForDriverRef}
            className="fixed w-full z-10 bottom-0  bg-white px-3 py-6 pt-12"
          >
            <WaitingForDriver
              ride={ride}
              pickup={pickup}
              destination={destination}
              fare={fare}
              vehicleType={vehicleType}
              setVehicleFound={setVehicleFound}
              setWaitingForDriver={setWaitingForDriver}
              waitingForDriver={waitingForDriver}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
