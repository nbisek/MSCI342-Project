import React from "react";
import axios from "axios";
import HeaderDefault from "../Header/HeaderDefault";
import { groupID, groupContent } from "../MyGroups/MyGroupCard";
import { useEffect } from "react";
import history from "../Navigation/history";
import GroupPost from "./GroupPost";

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

    //Get all of the posts using the groupContent.groupID
    axios.post("/api/getGroupPosts", { groupID: groupID }).then((res) => {
      console.log(res.data.data);
      const data = JSON.parse(res.data.data);
      console.log(data);
      setPosts(data);
    });
  }, []);

  const [group, setGroup] = React.useState({});
  const [posts, setPosts] = React.useState([]);

  return (
    <div
      className="flex flex-col min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 mb-10"
      style={{ background: "#fbfbfa" }}
    >
      <HeaderDefault thisPage="group" />
      <div className="mr-20 ml-20 flex flex-col">
        <div>
          <h1 className="text-4xl font-semibold">{group.title}</h1>
          <p className="font-semibold mt-3 mb-1">
            {group.members} members | {group.categories}
          </p>
          <p className="">{group.description}</p>
        </div>
        <div className="mt-10 flex flex-start items-start flex-wrap">
          {posts.map((post) => {
            return (
              <GroupPost
                title={post.title}
                username={post.username}
                postID={post.postID}
                description={post.description}
                creationDate={post.creation_date}
              ></GroupPost>
            );
          })}
        </div>
      </div>
    </div>
  );
}
