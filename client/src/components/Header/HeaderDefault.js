import React, { useState } from "react";
import { useEffect } from "react";
import history from "../Navigation/history";

export default function HeaderDefault(props) {
  const onClick = (e) => {
    sessionStorage.clear();
    history.push("/");
  };

  return (
    <div>
      <nav class="w-full z-30 top-0 text-blue-1000 py-1 lg:py-6">
        <div class="w-full flex flex-wrap justify-between">
          <span>
            <span class="hover:no-underline font-medium text-2xl lg:text-4xl flex flex-row items-center">
              <a
                class="hover:no-underline font-medium text-2xl lg:text-4xl flex flex-row items-center"
                href="/"
              >
                <img src="./logo.png" className="w-20 ml-20 mr-5" />
                <p className="text-4xl text-blue-1000 font-medium">
                  {" "}
                  WarriorsTogether{" "}
                </p>
              </a>
            </span>
          </span>
          <span className="mr-20 text-center my-auto flex flex-row items-center mt-4">
            {props.thisPage === "mygroups" ? (
              <p class="inline-block py-2 px-4 underline decoration-2">
                <p className="text-lg font-medium">My Groups</p>
              </p>
            ) : (
              <a class="inline-block py-2 px-4" href={"/mygroups"}>
                <p className="text-lg font-medium">My Groups</p>
              </a>
            )}
            {props.thisPage === "findgroups" ? (
              <p class="inline-block py-2 px-4 underline decoration-2">
                <p className="text-lg font-medium">Find Groups</p>
              </p>
            ) : (
              <a class="inline-block py-2 px-4" href={"/findgroups"}>
                <p className="text-lg font-medium">Find Groups</p>
              </a>
            )}
            <a
              class="inline-block py-2 px-4"
              href={"/settings"}
              style={{ width: "55px" }}
            >
              <img src="./img_120429.png" className="w-8" />
            </a>
          </span>
        </div>

        {/* <div class="w-full container mx-auto flex flex-wrap items-start justify-between mt-0 px-2 py-2 lg:py-6">
          <div class="pl-4 flex items-center">
            <a
              class="hover:no-underline font-medium text-2xl lg:text-4xl flex flex-row items-center"
              href="/"
            >
              <img src="./logo.png" className="w-20 ml-16 mr-5" />
              <p className="text-4xl text-blue-1000 font-medium">
                {" "}
                WarriorsTogether{" "}
              </p>
            </a>
          </div>
          <div
            class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 text-black p-4 lg:p-0 z-20 justify-end"
            id="nav-content"
          >
            <button class="mr-3">
              <a class="inline-block py-2 px-4" href={"/mygroups"}>
                <p className="text-lg text-blue-1000 border border-solid border-blue-1000 rounded-md px-4 py-2 font-medium">
                  My Groups
                </p>
              </a>
            </button>
            <button class="mr-3">
              <a class="inline-block py-2 px-4" href={"/settings"}>
                <p className="text-lg text-blue-1000 border border-solid border-blue-1000 rounded-md px-4 py-2 font-medium">
                  Settings
                </p>
              </a>
            </button>
            <button class="mr-3" onClick={onClick}>
              <a class="inline-block py-2 px-4">
                <p className="text-lg text-blue-1000 border border-solid border-blue-1000 rounded-md px-4 py-2 font-medium">
                  Log Out
                </p>
              </a>
            </button>
          </div>
        </div> */}
      </nav>
    </div>
  );
}
