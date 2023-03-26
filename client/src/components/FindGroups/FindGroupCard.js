import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export let groupID = -1;
export let groupContent = {};
const username = sessionStorage.getItem("username");

function FindGroupCard(props) {
  const [inGroup, setInGroup] = React.useState(false);

  useEffect(() => {
    setInGroup(props.joined);
  }, []);

  const joinGroup = () => {
    axios
      .post("/api/joinGroup", { username: username, groupID: props.groupID })
      .then((res) => {
        if (res.data.message === "success") {
          setInGroup(true);
        }
      });
  };

  const leaveGroup = () => {
    axios
      .post("/api/leaveGroup", { username: username, groupID: props.groupID })
      .then((res) => {
        if (res.data.message === "success") {
          setInGroup(false);
        }
      });
  };

  return (
    <div
      className="flex flex-col w-1/4 mr-10 my-4 cursor-pointer"
      style={{
        boxShadow: "rgba(236, 236, 236, 0.44) 0px 0px 15px",
        border: "1px solid #f8f4ef",
        background: "#fff",
      }}
    >
      <div className="p-8 pb-6">
        <h2 className="text-xl font-semibold">{props.title}</h2>
        <p className="mt-1">
          {props.members} members | {props.categories}
        </p>
      </div>
      <div className="p-8 pt-0 h-full flex flex-col space-between">
        <p className="mt-0 mb-6">{props.description}</p>

        {!inGroup && (
          <button
            className="px-4 py-2 bg-amber-300 mt-auto w-40 rounded"
            onClick={() => joinGroup()}
          >
            Join group
          </button>
        )}
        {inGroup && (
          <button
            className="px-4 py-2 bg-slate-200 mt-auto w-40 rounded"
            onClick={() => leaveGroup()}
          >
            Leave group
          </button>
        )}
      </div>
    </div>
  );
}

export default FindGroupCard;
