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
      color: props.color,
    };
    history.push("/group");
  };
  return (
    <div
      className="flex flex-col w-1/4 mr-10 my-4 cursor-pointer rounded-lg overflow-hidden"
      style={{
        // boxShadow: "rgba(236, 236, 236, 0.44) 0px 0px 15px",
        border: "1px solid #f8f4ef",
      }}
      onClick={() => openGroupPage()}
    >
      <div
        style={{ background: `${props.color}90` }}
        className="px-5 pt-5 pb-5"
      >
        <h2 className="text-xl font-medium">{props.title}</h2>
        <p className="mt-1">
          {props.members} members | {props.categories}
        </p>
      </div>
      <div
        className="p-5 rounded-b-lg"
        style={{
          border: `3px solid ${props.color}90`,
          borderTop: "none",
          height: "100%",
        }}
      >
        <p className="">{props.description}</p>
      </div>
    </div>
  );
}
