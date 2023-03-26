import React, { useContext, useEffect } from "react";
import history from "../Navigation/history";

import Header4 from "../Header/header4";
import { useState } from "react";
import { groupID } from "../MyGroups/MyGroupCard";
import dayjs from "dayjs";
import axios from "axios";

const CreatePost = () => {
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    if (!authToken) {
      history.push("/login");
    }
  }, []);

  const username = sessionStorage.getItem("username");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const now = dayjs();
  const date = now.format("YYYY-MM-DD");

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  }

  const onClick = (e) => {
    e.preventDefault();
    if (image != null) {
      const data = new FormData();
      data.append('pic', image);
      axios.post("/api/uploadPic", data)
        .then(function (res) {
          axios.post("/api/createPost", {
            username: username,
            groupID: groupID,
            creation_date: date,
            title: title,
            description: description,
            imageUrl: res.data,
          })
          .then((res) => {
            console.log(res);
          });
        })
    } else {
      axios.post("/api/createPost", {
        username: username,
        groupID: groupID,
        creation_date: date,
        title: title,
        description: description,
        imageUrl: "",
      })
      .then((res) => {
        console.log(res);
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200">
      <div className="mr-20 ml-20 flex flex-col">
        <form>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Title
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
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
          </div>
          <div class="flex w-1/4 flex-wrap mt-8 mb-8">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Choose an image</label>
            <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-1" id="file_input" type="file" accept=".jpg" onChange={handleFileChange}></input>
          </div>
          <button
            class="shadow bg-gray-700 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={onClick}
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
