import React from "react";
import HeaderDefault from "../Header/HeaderDefault";
import { groupID, groupContent } from "../FindGroups/FindGroupCard";
import { useEffect } from "react";
import history from "../Navigation/history";

export default function Group(props) {
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (!authToken) {
      history.push("/login");
    }
    setGroup(groupContent);
    if (groupID === -1) {
      history.push("/findgroups");
    }
  }, []);

  const [group, setGroup] = React.useState({});

  return (
    <div
      className="flex flex-col min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 mb-10"
      style={{ background: "#fbfbfa" }}
    >
      <HeaderDefault thisPage="group" />
      <div className="mr-20 ml-20 flex flex-col">
        <div>
          <h1 className="text-4xl font-semibold">{group.title}</h1>
          <p className="font-semibold mt-5 mb-1">
            {group.members} members | {group.categories}
          </p>
          <p className="">{group.description}</p>
        </div>
      </div>
    </div>
  );
}
