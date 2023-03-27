import React, { useContext, useEffect } from "react";
import history from "../components/Navigation/history";

import { useState } from "react";
import { groupID } from "../components/MyGroups/MyGroupCard";
import axios from "axios";

const CreatePost = (props) => {
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    if (!authToken) {
      history.push("/login");
    }
  }, []);

  const username = sessionStorage.getItem("username");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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

  const onClick = (e) => {
    e.preventDefault();
    console.log("bruh");
    axios
      .post("/api/createPost", {
        username: username,
        groupID: groupID,
        creation_date: new Date().toISOString().slice(0, 19).replace("T", " "),
        title: title,
        description: description,
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div
      className="h-screen w-screen fixed top-0 left-0 overflow-hidden"
      style={{ backgroundColor: "rgb(66, 66, 66, 0.4)" }}
    >
      <div style={modalStyle}>
        <h1 className="text-2xl font-semibold mb-5">Create a Post</h1>
        <form>
          <div class="flex flex-wrap -mx-3 mb-5">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Title
              </label>
              <input
                class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                // placeholder="A Sample Post Name"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-10">
            <div class="w-full px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-city"
              >
                Description
              </label>
              <textarea
                class="appearance-noneblock w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id=""
                type="text"
                // placeholder="This is a post description."
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-between">
            <button
              class="bg-gray-700 hover:bg-gray-600 focus:shadow-outline focus:outline-none text-white py-2 px-4 rounded"
              type="button"
              onClick={onClick}
            >
              Create Post
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-100 focus:shadow-outline focus:outline-none text-black py-2 px-4 rounded"
              onClick={() => props.setOpenModal(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
