import React, { useEffect } from "react";
import history from "../Navigation/history";

import Header4 from "../Header/header4";
import GroupCard from "../FindGroups/GroupCard";

const MyGroups = () => {
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (!authToken) {
      history.push("/login");
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
      <Header4 />
      <div className="mr-20 ml-20 flex flex-col">
        <h1 className="text-4xl font-semibold">My Groups</h1>
        <div className="flex flex-row">
          <div class="m-5 inline-block relative w-64">
            <select class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              <option selected disabled>
                Filter by Interests
              </option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <div class="mt-5 inline-block relative w-64 mx-5">
            <select class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              <option selected disabled>
                Sort By
              </option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap mt-5 justify-center">
          <div className="flex flex-col w-1/4 bg-gray-300 mx-4 my-4 p-5">
            <h2 className="text-xl">Loded Diper</h2>
            <p className="mt-1">12 members | sports, social</p>
            <p className="mt-4"> A cool band for even cooler guyz</p>
          </div>
          <div className="flex flex-col w-1/4 bg-gray-300 mx-4 my-4 p-5">
            <h2 className="text-xl">Group Name</h2>
            <p className="mt-1">12 members | sports, social</p>
            <p className="mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div className="flex flex-col w-1/4 bg-gray-300 mx-4 my-4 p-5">
            <h2 className="text-xl">Group Name</h2>
            <p className="mt-1">12 members | sports, social</p>
            <p className="mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyGroups;
