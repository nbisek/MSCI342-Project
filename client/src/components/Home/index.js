import React from "react";
import Header from "../Header/header";
import SignUp from "../SignUp";

function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
      <Header />
      <div className=" m-20 flex flex-col justify-around md:flex-row items-center">
        <div className="w-1/2">
          {" "}
          <img src="collaboration.png" className="" />
          <p className="text-4xl font-dancing-script text-blue-1000 font-bold text-center">
            {" "}
            Connect with other waterloo students!
          </p>
        </div>
        <div className="flex flex-col items-center justify-center ml-4">
          <SignUp />
        </div>
      </div>
    </div>
  );
}

export default Home;
