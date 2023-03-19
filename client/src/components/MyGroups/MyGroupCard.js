import React from "react";
import { useEffect } from "react";
import history from "../Navigation/history";

export let groupID = -1;
export let groupContent = {};

export default function MyGroupsCard(props) {
  const openGroupPage = () => {
    //do something
    console.log("open group page", groupID);
    groupID = props.groupID;
    groupContent = {
      title: props.title,
      members: props.members,
      categories: props.categories,
      description: props.description,
      groupID: props.groupID,
    };
    history.push("/group");
  };
  return (
    <div
      className="flex flex-col w-1/4 mr-10 my-4 p-8 cursor-pointer"
      style={{
        boxShadow: "rgba(236, 236, 236, 0.44) 0px 0px 15px",
        border: "1px solid #f8f4ef",
        background: "#fff",
      }}
      onClick={() => openGroupPage()}
    >
      <h2 className="text-xl font-semibold">{props.title}</h2>
      <p className="mt-1">
        {props.members} members | {props.categories}
      </p>
      <p className="mt-6">{props.description}</p>
    </div>
  );
}
