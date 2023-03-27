import React, { useContext, useEffect } from "react";
import history from "../Navigation/history";

import Header4 from "../Header/header4";
import { useState } from "react";
import { groupID } from "../MyGroups/MyGroupCard";
import dayjs from "dayjs";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

const CreateEvent = (props) => {
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    if (!authToken) {
      history.push("/login");
    }
  }, []);

  const username = sessionStorage.getItem("username");
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [dateValue, setDateValue] = useState(new Date());

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

  //   const date = now.format("YYYY-MM-DD");

  const onClick = (e) => {
    e.preventDefault();
    console.log("bruh event", groupID);
    axios
      .post("/api/createEvent", {
        username: username,
        groupID: groupID,
        title: title,
        description: description,
        location: location,
        event_date: Math.floor(dateValue.getTime() / 1000),
      })
      .then((res) => {
        console.log(res);
        props.getEvents();
        setDateValue(new Date());
        setLocation("");
        setTitle("");
        setDescription("");
      });
    props.setOpenModal(false);
  };

  return (
    <div
      className="h-screen w-screen fixed top-0 left-0 overflow-hidden"
      style={{ backgroundColor: "rgb(66, 66, 66, 0.4)" }}
    >
      <div style={modalStyle}>
        <h1 className="text-2xl font-medium mb-5">Create an Event</h1>
        <form>
          <div class="flex flex-wrap -mx-3 mb-5">
            <div class="w-full md:w-3/4 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Title
              </label>
              <input
                class="appearance-noneblock w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-first-name"
                type="text"
                // placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-5">
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
                // placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-3/4 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Location
              </label>
              <input
                class="appearance-noneblock w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-first-name"
                type="text"
                // placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-8">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-city"
              >
                Date and Time
              </label>
              <DateTimePicker
                onChange={setDateValue}
                value={dateValue}
                maxDetail="minute"
                format="dd-MM-y h:mm a"
                disableClock
                disableCalendar
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-between">
            <button
              class="shadow bg-gray-700 hover:bg-gray-600 focus:shadow-outline focus:outline-none text-white py-2 px-4 rounded"
              type="button"
              onClick={onClick}
            >
              Create Event
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

export default CreateEvent;
