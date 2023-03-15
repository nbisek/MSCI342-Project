import React, { useEffect } from "react";
import history from "../Navigation/history";

import Header4 from "../Header/header4";
import GroupCard from "../FindGroups/FindGroupCard";
import HeaderDefault from "../Header/HeaderDefault";
import MyGroupsCard from "./MyGroupCard";

const MyGroups = () => {
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (!authToken) {
      history.push("/login");
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden pb-10">
      <HeaderDefault thisPage="mygroups" />
      <div className="mr-20 ml-20 flex flex-col">
        <h1 className="text-4xl font-semibold">My Groups</h1>
        <div className="flex flex-row">
          <div class="m-5 mx-0 inline-block relative w-64">
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
        <div className="flex flex-wrap mt-5 justify-start">
          <MyGroupsCard
            title="Nadia Test"
            members="2"
            categories="social"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu scelerisque mi. In bibendum magna eu urna tincidunt cursus. Maecenas orci libero, porta eget odio ut, mattis bibendum nisl. Sed dapibus metus eget magna elementum, in euismod mauris lobortis. Nam augue erat, mollis sed molestie sed, vehicula nec arcu."
          ></MyGroupsCard>
          <MyGroupsCard
            title="Nadia Test"
            members="2"
            categories="social"
            description="Nadia testing this"
          ></MyGroupsCard>
          <MyGroupsCard
            title="Nadia Test"
            members="2"
            categories="social"
            description="Nadia testing this"
          ></MyGroupsCard>
          <MyGroupsCard
            title="Nadia Test"
            members="2"
            categories="social"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu scelerisque mi. In bibendum magna eu urna tincidunt cursus. Maecenas orci libero, porta eget odio ut, mattis bibendum nisl. Sed dapibus metus eget magna elementum, in euismod mauris lobortis. Nam augue erat, mollis sed molestie sed, vehicula nec arcu."
          ></MyGroupsCard>
          <MyGroupsCard
            title="Nadia Test"
            members="2"
            categories="social"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu scelerisque mi. In bibendum magna eu urna tincidunt cursus. Maecenas orci libero, porta eget odio ut, mattis bibendum nisl. Sed dapibus metus eget magna elementum, in euismod mauris lobortis. Nam augue erat, mollis sed molestie sed, vehicula nec arcu."
          ></MyGroupsCard>
        </div>
      </div>
    </div>
  );
};

export default MyGroups;
