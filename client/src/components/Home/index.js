import React from "react";
import Header from "../Header/header";
import SignUp from "../SignUp";

function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
      <Header />
      <div className=" mt-12 flex flex-col justify-around md:flex-row items-center">
        <div className="w-1/2">
          {" "}
          <img src="collaboration.png" className="" />
          <blockquote className="text-3xl mt-3 font-dancing-script text-blue-1000 font-bold text-center italic text-slate-900">
            {" "}
            Connect with other&nbsp;
            <span class="before:block before:absolute before:-inset-1 before:-skew-y-1 before:bg-yellow-500 relative inline-block">
              <span class="relative text-white">UWaterloo</span>
            </span>
            &nbsp;students!
          </blockquote>
        </div>
        <div className="flex flex-col items-center justify-center ml-4">
          <SignUp />
        </div>
      </div>
    </div>
  );
}

export default Home;
