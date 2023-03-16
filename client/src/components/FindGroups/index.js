import React, { useEffect } from "react";
import axios from "axios";
import Header3 from "../Header/header3";
import HeaderDefault from "../Header/HeaderDefault";
import FindGroupCard from "./FindGroupCard";
import history from "../Navigation/history";

function FindGroups() {
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    if (!authToken) {
      history.push("/login");
    }

    //Getting the groups from the database
    axios.get("/api/getGroups").then((res) => {
      console.log(res.data.data);
      const data = JSON.parse(res.data.data);
      setGroups(data);
    });
  }, []);

  const [groups, setGroups] = React.useState([]);
  const username = sessionStorage.getItem("username");
  console.log(username);
  return (
    <div
      className="flex flex-col min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 mb-10"
      style={{ background: "#fbfbfa" }}
    >
      <HeaderDefault thisPage="findgroups" />
      <div className="mr-20 ml-20 flex flex-col">
        <h1 className="text-4xl font-semibold">Find Groups</h1>
        <div className="flex flex-row">
          <div class="m-5 mx-0 inline-block relative w-64">
            <select class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              <option selected disabled>
                Filter by Interests
              </option>
              <option>Option 1</option>
              <option>Option 2</option>
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
            <select class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              <option selected disabled>
                Sort By
              </option>
              <option>Option 1</option>
              <option>Option 2</option>
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
          {/* <FindGroupCard
            title="Baking Club"
            members="17"
            categories="food, social"
            description="People coming together to bake all sorts of things. No experience is needed and we will supply all baking supplies. Come bake with us :)"
          />
          <FindGroupCard
            title="Baking Club"
            members="17"
            categories="food, social"
            description="People coming together to bake all sorts of things. No experience is needed and we will supply all baking supplies. Come bake with us :)"
          />
          <FindGroupCard
            title="Baking Club"
            members="17"
            categories="food, social"
            description="People coming together to bake all sorts of things. No experience is needed and we will supply all baking supplies. Come bake with us :)"
          />
          <FindGroupCard
            title="Baking Club"
            members="17"
            categories="food, social"
            description="People coming together to bake all sorts of things. No experience is needed and we will supply all baking supplies. Come bake with us :)"
          /> */}
          {groups.map((group, index) => {
            return (
              <FindGroupCard
                title={group.group_name}
                description={group.description}
                categories={group.categories}
                groupID={group.groupID}
              ></FindGroupCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FindGroups;
