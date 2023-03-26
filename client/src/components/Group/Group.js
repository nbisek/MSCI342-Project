import React from "react";
import axios from "axios";
import HeaderDefault from "../Header/HeaderDefault";
import { groupID, groupContent } from "../MyGroups/MyGroupCard";
import { useEffect } from "react";
import history from "../Navigation/history";
import GroupPost from "./GroupPost";
import GroupEvent from "./GroupEvent";
import CreatePost from "../CreatePost/CreatePost";
import CreateEvent from "../CreateEvent/CreateEvent";

export default function Group(props) {
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (!authToken) {
      history.push("/login");
    }
    setGroup(groupContent);
    if (groupID === -1) {
      history.push("/mygroups");
    }

    //Get all of the posts using the groupContent.groupID
    getPosts();
    getEvents();
  }, []);

  const [group, setGroup] = React.useState({});
  const [posts, setPosts] = React.useState([]);
  const [events, setEvents] = React.useState([]);
  const [viewPosts, setViewPosts] = React.useState(true);

  const getPosts = () => {
    axios.post("/api/getGroupPosts", { groupID: groupID }).then((res) => {
      console.log(res.data.data);
      const data = JSON.parse(res.data.data);
      console.log(data);
      setPosts(data);
    });
  };

  const getEvents = () => {
    axios.post("/api/getGroupEvents", { groupID: groupID }).then((res) => {
      setEvents(res.data);
    });
  };

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
        <div className="flex flex-wrap mt-5">
          {viewPosts ? (
            <button className="bg-amber-300 px-4 py-2 font-semibold">
              Posts
            </button>
          ) : (
            <button
              className=" bg-amber-100 px-4 py-2"
              onClick={() => setViewPosts(!viewPosts)}
            >
              Posts
            </button>
          )}
          {viewPosts ? (
            <button
              className="bg-amber-100 px-4 py-2"
              onClick={() => setViewPosts(!viewPosts)}
            >
              Events
            </button>
          ) : (
            <button className="bg-amber-300 px-4 py-2 font-semibold">
              Events
            </button>
          )}
        </div>
        <div className="mt-10 flex flex-start items-start flex-wrap">
          {viewPosts &&
            posts.map((post) => {
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
          {!viewPosts &&
            events.map((event) => {
              return (
                <GroupEvent
                  title={event.title}
                  username={event.username}
                  description={event.description}
                  location={event.location}
                  eventDate={event.event_date}
                  eventTime={event.event_time}
                  eventID={event.eventID}
                ></GroupEvent>
              );
            })}
        </div>
      </div>
      {viewPosts ? (
        <CreatePost />
      ) : (
        <div>
          {" "}
          <CreateEvent />{" "}
        </div>
      )}
    </div>
  );
}
