import React from "react";
import { useEffect } from "react";
import history from "../Navigation/history";
import { paletteList } from "../../color-palette";

export let groupID = -1;
export let groupContent = {};

export default function MyGroupsCard(props) {
  const randomColor =
    paletteList[Math.floor(Math.random() * paletteList.length)];
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
      colour: props.colour,
    };
    history.push("/group");
  };
  return (
    <div
      className="flex flex-col w-1/4 mr-10 my-4 cursor-pointer overflow-hidden rounded-md"
      style={{
        // boxShadow: "rgb(235, 235, 235) 0px 0px 10px",
        // border: `2px solid`,
        // borderColor: randomColor,
        // opacity: "0.6",
        background: "#fff",
      }}
      onClick={() => openGroupPage()}
    >
      {" "}
      <div
        className="pt-5 px-5 pb-5"
        style={{
          background: props.colour,
        }}
      >
        <h2 className="text-xl font-semibold">{props.title}</h2>
        <p className="mt-1">
          {props.members} members | {props.categories}
        </p>
      </div>
      <div
        className="px-5 pb-5"
        style={{
          background: `${props.colour}30`,
          height: "100%",
        }}
      >
        <p className="mt-6">{props.description}</p>
      </div>
    </div>
  );
}
