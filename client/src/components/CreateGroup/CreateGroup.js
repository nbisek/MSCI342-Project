import React, { useContext, useEffect } from "react";
import history from "../Navigation/history";

import Header4 from "../Header/header4";
import FindGroupCard from "../FindGroups/FindGroupCard";
import { useState } from "react";
import interests from "../../constants/interests";

import axios from "axios";

const CreateGroup = () => {
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    if (!authToken) {
      history.push("/login");
    }
  }, []);

  const username = sessionStorage.getItem("username");

  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState({});

  const onClick = (e) => {
    e.preventDefault();
    console.log(Object.keys(categories).join(", "))
    axios
      .post("/api/createGroup", {
        group_name: groupName,
        categories: Object.keys(categories).join(", "),
        creator_user: username,
        description: description,
      })
      .then((res) => {
        console.log(res);
      });
  };

  const toggleCategory = (category) => {
    const newCategories = ({}, categories)
    if (newCategories[category]) {
      delete newCategories[category];
    } else {
      newCategories[category] = 1;
    }

    setCategories(newCategories);
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
      <Header4 />
      <div className="mr-20 ml-20 flex flex-col">
        <form>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Group Name
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Jane"
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-city"
              >
                Description
              </label>
              <textarea
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id=""
                type="text"
                placeholder=""
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-state"
              >
                Categories
              </label>
              <div class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" style={{maxHeight:"250px", overflowY:"scroll"}}>
                {interests.filter(interest => (interest !== "All")).map((interest, idx) => (
                    <div key={interest}>
                      <input type="checkbox" name={`check-${idx}`} value={interest} id={`check-${idx}`} onClick={(e)=>toggleCategory(e.target.value)}/>
                      <label for={`check-${idx}`}>{" "}{interest}</label>
                    </div>
                ))}
              </div>
            </div>
          </div>
          <button
            class="shadow bg-gray-700 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={onClick}
          >
            Create Group
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
