import React, { useEffect } from "react";
import axios from "axios";
import HeaderDefault from "../Header/HeaderDefault";
import FindGroupCard from "./FindGroupCard";
import history from "../Navigation/history";
import interests from "../../constants/interests";

function FindGroups() {
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    if (!authToken) {
      history.push("/login");
    }

    //Getting the groups from the database
    // axios.get("/api/getGroups").then((res) => {
    //   console.log(res.data.data);
    //   const data = JSON.parse(res.data.data);
    //   setGroups(data);
    // });
    const fetchData = async () => {
      const groups = [];
      const notJoinedGroups = await axios.post("/api/getNotJoinedGroups", {
        username: username,
      });
      groups.push(
        ...notJoinedGroups.data.map((group) => ({ ...group, joined: false }))
      );
      const joinedGroups = await axios.post("/api/getJoinedGroups", {
        username: username,
      });
      groups.push(
        ...joinedGroups.data.map((group) => ({ ...group, joined: true }))
      );
      setGroups(groups);
      console.log(groups);
    };
    fetchData();
  }, []);

  const [groups, setGroups] = React.useState([]);
  const [interest, setInterest] = React.useState("All");

  const sortGroups = (e) => {
    const groupsCopy = groups.slice();
    if (e.target.value === "Name") {
      groupsCopy.sort((a, b) =>
        a.group_name.toLowerCase() < b.group_name.toLowerCase() ? -1 : 1
      );
    } else if (e.target.value === "Least Members") {
      groupsCopy.sort((a, b) => a.members - b.members);
    } else if (e.target.value === "Most Members") {
      groupsCopy.sort((a, b) => b.members - a.members);
    } else {
      groupsCopy.sort((a, b) => b.joined - a.joined);
    }
    setGroups(groupsCopy);
  };

  const username = sessionStorage.getItem("username");
  return (
    <div
      className="flex flex-col min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 mb-10"
      style={{ background: "#fbfbfa" }}
    >
      <HeaderDefault thisPage="findgroups" />
      <div className="mr-20 ml-20 flex flex-col">
        <h1 className="text-4xl font-medium">Find Groups</h1>
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
              <option>Least Members</option>
              <option>Most Members</option>
              <option>Joined</option>
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
        </div>
        <div className="flex flex-wrap mt-5 justify-start">
          {(interest !== "All"
            ? groups.filter((group) =>
                group.categories.toLowerCase().includes(interest.toLowerCase())
              )
            : groups
          ).map((group) => (
            <FindGroupCard
              key={group.groupID}
              title={group.group_name}
              description={group.description}
              categories={group.categories}
              groupID={group.groupID}
              joined={group.joined}
              members={group.members}
              group={group}
              groups={groups}
              setGroups={setGroups}
            ></FindGroupCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FindGroups;
