import React from "react";
import history from "../Navigation/history";

export let groupID = -1;
export let groupContent = {};

function FindGroupCard(props) {
  const onClick = () => {
    //If the user clicks on the group, go to the group page
    console.log("open", props.title, " with id", groupID);
    groupID = props.groupID;
    groupContent = {
      title: props.title,
      members: props.members,
      description: props.description,
      categories: props.categories,
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
      onClick={() => onClick()}
    >
      <h2 className="text-xl font-semibold">{props.title}</h2>
      <p className="mt-1">
        {props.members} members | {props.categories}
      </p>
      <p className="mt-4">{props.description}</p>
    </div>
  );
}

export default FindGroupCard;
