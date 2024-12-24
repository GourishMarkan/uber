// import React from "react";

import useGetUser from "../hooks/useGetUser";

const Home = () => {
  useGetUser();
  return <div>Home</div>;
};

export default Home;
