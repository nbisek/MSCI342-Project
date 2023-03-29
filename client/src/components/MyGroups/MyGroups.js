import React, { useEffect } from "react";
import history from "../Navigation/history";
import axios from "axios";

import Header4 from "../Header/header4";
import GroupCard from "../FindGroups/FindGroupCard";
import HeaderDefault from "../Header/HeaderDefault";
import MyGroupsCard from "./MyGroupCard";
import interests from "../../constants/interests";
import CreateGroup from "../CreateGroup/CreateGroup";

const MyGroups = () => {
  const [groups, setGroups] = React.useState([]);
  const [interest, setInterest] = React.useState("All");
  const username = sessionStorage.getItem("username");
  const [showCreate, setShowCreate] = React.useState(false);

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (!authToken) {
      history.push("/login");
    }

    axios.post("/api/getMyGroups", { username: username }).then((res) => {
      const data = JSON.parse(res.data.data);
      setGroups(data);
    });
  }, []);

  const sortGroups = (e) => {
    const groupsCopy = groups.slice();
    if (e.target.value === "Name") {
      groupsCopy.sort((a, b) =>
        a.group_name.toLowerCase() < b.group_name.toLowerCase() ? -1 : 1
      );
    } else if (e.target.value === "Members") {
      groupsCopy.sort((a, b) => a.members - b.members);
    } else {
      groupsCopy.sort((a, b) => a.joined - b.joined);
    }
    setGroups(groupsCopy);
  };

  return (
    <div
      className="flex flex-col min-h-screen overflow-hidden pb-10"
      style={{ background: "#fbfbfa" }}
    >
      <HeaderDefault thisPage="mygroups" />
      <div className="mr-20 ml-20 flex flex-col">
        <h1 className="text-4xl font-medium">My Groups</h1>
        <div className="flex flex-row">
          <div class="m-5 mx-0 inline-block relative w-64">
            <select
              onChange={(e) => setInterest(e.target.value)}
              class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option selected disabled>
                Filter by Interests
              </option>
              {interests.map((interest) => (
                <option key={interest}>{interest}</option>
              ))}
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <div class="mt-5 inline-block relative w-64 mx-5">
            <select
              onChange={(e) => sortGroups(e)}
              class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option selected disabled>
                Sort By
              </option>
              <option>Name</option>
              <option>Members</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mb-5">
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <div className="mt-auto mb-auto">
            <button
              className="py-2 px-5 bg-amber-300 rounded"
              onClick={() => setShowCreate(true)}
            >
              Create Group
            </button>
          </div>
        </div>
        <div className="flex flex-wrap mt-5 justify-start">
          {(interest !== "All"
            ? groups.filter((group) =>
                group.categories.toLowerCase().includes(interest.toLowerCase())
              )
            : groups
          ).map((group) => (
            <MyGroupsCard
              key={group.groupID}
              title={group.group_name}
              members={group.members}
              categories={group.categories}
              description={group.description}
              groupID={group.groupID}
              id={`group${group.groupID}`}
              color={group.colour}
            ></MyGroupsCard>
          ))}
        </div>
      </div>
      {showCreate && <CreateGroup setShowCreate={setShowCreate} />}
    </div>
  );
};

export default MyGroups;
