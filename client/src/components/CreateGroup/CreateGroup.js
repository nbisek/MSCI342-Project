import React, { useContext, useEffect } from "react";
import history from "../Navigation/history";

import Header4 from "../Header/header4";
import FindGroupCard from "../FindGroups/FindGroupCard";
import { useState } from "react";
import interests from "../../constants/interests";

import axios from "axios";

const CreateGroup = (props) => {
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
  const [color, setColor] = useState("#DBC5EF");
  const [invalidName, setInvalidName] = useState(false);
  const [invalidDescription, setinvalidDescription] = useState(false);
  const [invalidCategories, setInvalidCategories] = useState(false);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "45%",
    background: "#ffffff",
    padding: "30px",
    borderRadius: "5px",
  };

  const invalidate = () => {
    const blankName = groupName == "";
    const noDescription = description == "";
    const noCategories = Object.keys(categories).length == 0;
    setInvalidName(blankName);
    setinvalidDescription(noDescription);
    setInvalidCategories(noCategories);
    return blankName || noDescription || noCategories;
  }

  const onClick = (e) => {
    e.preventDefault();
      if (!invalidate()) {
        axios
          .post("/api/createGroup", {
            group_name: groupName,
            categories: Object.keys(categories).join(", "),
            creator_user: username,
            description: description,
            color: color,
          })
          .then((res) => {
            console.log(res);
          });
        props.setShowCreate(false);
    }
  };

  const toggleCategory = (category) => {
    const newCategories = ({}, categories);
    if (newCategories[category]) {
      delete newCategories[category];
    } else {
      newCategories[category] = 1;
    }

    setCategories(newCategories);
  };

  return (
    <div
      className="h-screen w-screen fixed top-0 left-0 overflow-hidden"
      style={{ backgroundColor: "rgb(66, 66, 66, 0.4)" }}
    >
      <div style={modalStyle}>
        <form>
          <h1 className="text-2xl font-medium mb-5">Create a Group</h1>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Group Name
              </label>
              <input
                class={
                  invalidName
                  ? "appearance-noneblock w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 border-red-500"
                  : "appearance-noneblock w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                }
                id="grid-first-name"
                type="text"
                onChange={(e) => setGroupName(e.target.value)}
              />
              {
                invalidName ? <p class="text-red-700 text-xs italic pt-2">Group name cannot be empty!</p> : <></>
              }
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-city"
              >
                Description
              </label>
              <textarea
                class= {
                  invalidDescription
                  ? "appearance-noneblock w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 border-red-500"
                  : "appearance-noneblock w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                }
                id=""
                type="text"
                placeholder=""
                onChange={(e) => setDescription(e.target.value)}
                style={{ height: "150px" }}
              />
              {
                invalidDescription ? <p class="text-red-700 text-xs italic pt-2">Description cannot be empty!</p> : <></>
              }
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-state"
              >
                Categories
              </label>
              <div
                class={
                  invalidCategories
                  ? "block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 border-red-500"
                  : "block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                }
                style={{ maxHeight: "150px", overflowY: "scroll" }}
              >
                {interests
                  .filter((interest) => interest !== "All")
                  .map((interest, idx) => (
                    <div key={interest}>
                      <input
                        type="checkbox"
                        name={`check-${idx}`}
                        value={interest}
                        id={`check-${idx}`}
                        onClick={(e) => toggleCategory(e.target.value)}
                      />
                      <label for={`check-${idx}`}> {interest}</label>
                    </div>
                  ))}
              </div>
              {
                invalidCategories ? <p class="text-red-700 text-xs italic pt-2">You must choose at least one category!</p> : <></>
              }
            </div>
          </div>
          <div className="mb-8">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4"
              for="color"
            >
              Group Color
            </label>
            <select
              name="color"
              id="color"
              className="py-2 px-5 bg-white border cursor-pointer"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            >
              <option value="#DBC5EF">Lavender</option>
              <option value="#93B0D7">Light Blue</option>
              <option value="#a8d9d2">Mint</option>
              <option value="#D0EEBD">Light Green</option>
              <option value="#FFE3C5">Peach</option>
              <option value="#FFCA8D">Orange</option>
              <option value="#E78E8E">Red</option>
            </select>
          </div>
          <div className="flex flex-wrap justify-between">
            <button
              class="shadow bg-gray-700 hover:bg-gray-600 focus:shadow-outline focus:outline-none text-white py-2 px-4 rounded"
              type="button"
              onClick={onClick}
            >
              Create Group
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-100 focus:shadow-outline focus:outline-none text-black py-2 px-4 rounded"
              onClick={() => props.setShowCreate(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
