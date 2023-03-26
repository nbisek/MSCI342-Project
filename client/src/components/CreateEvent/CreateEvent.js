import React, { useContext, useEffect } from "react";
import history from "../Navigation/history";

import Header4 from "../Header/header4";
import { useState } from "react";
import { groupID } from "../MyGroups/MyGroupCard";
import dayjs from "dayjs";
import axios from "axios";
import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

const CreateEvent = () => {
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

  //   const date = now.format("YYYY-MM-DD");

  const onClick = (e) => {
    e.preventDefault();
    console.log("bruh", groupID);
    const pad = (num) => String(num).padStart(2, '0')
    const event_date = `${dateValue.getFullYear()}-${pad(dateValue.getMonth())}-${pad(dateValue.getDate())}`
    const event_time = `${pad(dateValue.getHours())}:${pad(dateValue.getMinutes())}`
    axios
      .post("/api/createEvent", {
        username: username,
        groupID: groupID,
        title: title,
        description: description,
        location: location,
        event_date: event_date,
        event_time: event_time,
      })
      .then((res) => {
        console.log(res);
      });
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
                class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-8">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-city"
              >
                Description
              </label>
              <textarea
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id=""
                type="text"
                placeholder=""
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Location
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
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
              <DateTimePicker onChange={setDateValue} value={dateValue} maxDetail="minute" format="dd-MM-y h:mm a" disableClock disableCalendar />
            </div>
          </div>
          <button
            class="shadow bg-gray-700 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={onClick}
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
