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
  const [openPostModal, setOpenPostModal] = React.useState(false);
  const [openEventModal, setOpenEventModal] = React.useState(false);
  const [areYouSure, setAreYouSure] = React.useState(false);
  const username = sessionStorage.getItem("username");
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    background: "#f4f4f4",
    padding: "30px",
    borderRadius: "5px",
    // boxShadow: "0px 0px 15px #787878",
  };

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

  const sortPosts = (e) => {
    const postsCopy = posts.slice();
    if (e.target.value === "Newest") {
      postsCopy.sort((a, b) => (a.creation_date > b.creation_date ? -1 : 1));
    } else if (e.target.value === "Oldest") {
      postsCopy.sort((a, b) => (a.creation_date < b.creation_date ? -1 : 1));
    } else if (e.target.value === "Title") {
      postsCopy.sort((a, b) =>
        a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1
      );
    } else {
      postsCopy.sort((a, b) =>
        a.username.toLowerCase() < b.username.toLowerCase() ? -1 : 1
      );
    }
    setPosts(postsCopy);
  };

  const sortEvents = (e) => {
    const eventsCopy = events.slice();
    if (e.target.value === "Earliest") {
      eventsCopy.sort((a, b) => a.event_date - b.event_date);
    } else if (e.target.value === "Latest") {
      eventsCopy.sort((a, b) => b.event_date - a.event_date);
    } else if (e.target.value === "Creator") {
      eventsCopy.sort((a, b) =>
        a.username.toLowerCase() < b.username.toLowerCase() ? -1 : 1
      );
    }
    setEvents(eventsCopy);
  };

  const leaveGroup = () => {
    axios
      .post("/api/leaveGroup", { username: username, groupID: groupID })
      .then((res) => {
        if (res.data.message === "success") {
          history.push("/mygroups");
        }
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
          <h1 className="text-4xl font-medium">{group.title}</h1>
          <button
            className="px-4 py-2 bg-red-600 mt-3 w-30 h-10 rounded text-white"
            onClick={() => setAreYouSure(true)}
          >
            Leave group
          </button>
          <p className="font-medium mt-3 mb-1">
            {group.members} members | {group.categories}
          </p>
          <p className="">{group.description}</p>
        </div>
        <div className="flex flex-wrap mt-5">
          {viewPosts ? (
            <button className="bg-amber-300 px-4 py-2 font-medium">
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
            <button className="bg-amber-300 px-4 py-2 font-medium">
              Events
            </button>
          )}
        </div>
        <div className="flex flex-row">
          <div class="mt-5 inline-block relative w-64">
            {viewPosts ? (
              <select
                onChange={(e) => sortPosts(e)}
                class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                <option selected disabled>
                  Sort By
                </option>
                <option>Newest</option>
                <option>Oldest</option>
                <option>Title</option>
                <option>Username</option>
              </select>
            ) : (
              <select
                onChange={(e) => sortEvents(e)}
                class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                <option selected disabled>
                  Sort By
                </option>
                <option>Earliest</option>
                <option>Latest</option>
                <option>Creator</option>
              </select>
            )}
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
          {viewPosts ? (
            <div className="mt-auto ml-5">
              <button
                className="py-2 px-4 bg-amber-300 rounded"
                onClick={() => setOpenPostModal(true)}
              >
                Create Post
              </button>
            </div>
          ) : (
            <div className="mt-auto ml-5">
              <button
                className="py-2 px-4 bg-amber-300 rounded"
                onClick={() => setOpenEventModal(true)}
              >
                Create Event
              </button>
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-start items-start flex-wrap">
          {viewPosts &&
            posts.map((post) => {
              return (
                <GroupPost
                  title={post.title}
                  username={post.username}
                  postID={post.postID}
                  description={post.description}
                  creationDate={post.creation_date}
                  imageUrl={post.imageUrl}
                  getPosts={getPosts}
                  posts={posts}
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
                  eventID={event.eventID}
                ></GroupEvent>
              );
            })}
        </div>
      </div>
      {/* {viewPosts ? (
        <CreatePost getPosts={getPosts} />
      ) : (
        <div>
          {openModal && (
            <CreateEvent getEvents={getEvents} setOpenModal={setOpenModal} />
          )}
        </div>
      )} */}
      {openPostModal && (
        <CreatePost getPosts={getPosts} setOpenModal={setOpenPostModal} />
      )}
      {openEventModal && (
        <CreateEvent getEvents={getEvents} setOpenModal={setOpenEventModal} />
      )}
      {areYouSure && (
        <div
          className="h-screen w-screen fixed top-0 left-0 overflow-hidden"
          style={{ backgroundColor: "rgb(66, 66, 66, 0.4)" }}
        >
          <div id="modal" style={modalStyle}>
            <h2 className="text-2xl font-medium mb-5">Are you sure?</h2>
            <p className="mb-10">
              Are you sure you want to leave {props.title}? Your posts and
              comments will <span className="font-bold">not</span> be deleted,
              and you can always rejoin later.
            </p>
            <div className="flex flex-wrap justify-between">
              <button
                onClick={() => {
                  setAreYouSure(false);
                  leaveGroup();
                }}
                className="text-white px-4 py-1 bg-red-700 rounded"
              >
                Leave Group
              </button>
              <button
                onClick={() => setAreYouSure(false)}
                className="underline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
