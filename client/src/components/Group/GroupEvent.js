import React from "react";
import dayjs from "dayjs";
import axios from "axios";
import { useEffect } from "react";
import history from "../Navigation/history";

export default function GroupEvent(props) {
  const style = {
    width: "45%",
    minHeight: "200px",
    minWidth: "300px",
    boxShadow: "rgba(236, 236, 236, 0.44) 0px 0px 15px",
    border: "1px solid #f8f4ef",
    background: "#fff",
  };

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

  const d = dayjs(props.eventDate).format("MMMM D, YYYY");
  const time = props.eventTime.slice(0, -3);
  const [attending, setAttending] = React.useState([]);
  const [isHost, setIsHost] = React.useState(false);
  const [displayModal, setDisplayModal] = React.useState(false);
  const [displayConfirmation, setDisplayConfirmation] = React.useState(false);
  const [deleted, setDeleted] = React.useState(false);
  const eventID = props.eventID;
  const [isAttending, setIsAttending] = React.useState(false);
  const [numAttending, setNumAttending] = React.useState(0);
  const username = sessionStorage.getItem("username");

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    if (!authToken) {
      history.push("/login");
    }
    //Call api to check if the user is attending or not
    //Call api to see if the user is the host of the event
    checkIfHost();
    checkIfHostAttending();
    getAttending();
    console.log("ran");
  }, []);

  const deleteEvent = () => {
    setDisplayModal(false);
    //Api call to delete the post
    axios.post("/api/deleteAllRsvp", { eventID: eventID }).then((res) => {
      axios
        .post("/api/deleteEvent", { eventID: eventID, username: username })
        .then(() => {
          //show as deleted
          setDeleted(true);
          setDisplayConfirmation(true);
        });
    });
  };

  const getAttending = () => {
    axios.post("/api/getAttending", { eventID: eventID }).then((res) => {
      // console.log("likes:", res.data);
      setAttending(res.data);
      setNumAttending(res.data.length);
    });
  };

  const checkIfHost = () => {
    console.log("ran 2");
    axios
      .post("/api/checkIfHost", { eventID: eventID, username: username })
      .then((res) => {
        const ifHost = res.data[0]["COUNT(1)"];
        if (ifHost) {
          setIsHost(true);
          console.log("is author of event", eventID);
        } else {
          setIsHost(false);
        }
      });
  };

  const checkIfHostAttending = () => {
    axios
      .post("/api/checkIfHostAttending", {
        eventID: eventID,
        username: username,
      })
      .then((res) => {
        const ifHost = res.data[0]["COUNT(1)"];
        if (ifHost) {
          setIsAttending(true);
          console.log("is author of event", eventID);
        } else {
          setIsAttending(false);
        }
      });
  };

  const clickRSVP = () => {
    setIsAttending(!isAttending);
    if (!isAttending) {
      //You are attending
      setNumAttending(numAttending + 1);
      //Add rsvp to database
      axios.post("/api/addRsvp", {
        eventID: eventID,
        username: username,
      });
    } else {
      //You are not attending
      setNumAttending(numAttending - 1);
      axios.post("/api/deleteRsvp", {
        eventID: eventID,
        username: username,
      });
    }
  };

  return (
    <div style={style} className="mr-5 mb-5 p-5">
      <div>
        <h1 className="text-2xl font-semibold">{props.title}</h1>
        <p className="text-sm mt-1">
          hosted by{" "}
          <span className="font-semibold text-base">{props.username}</span>
        </p>
        <p>
          {d} @ {time}
        </p>
        <p>{numAttending} are going</p>
        <p className="mt-5">{props.description}</p>
        <div className="flex flex-wrap justify-between mt-5 align-bottom">
          <div>
            {isAttending && !deleted && (
              <button
                className="bg-green-600 px-4 py-2 rounded text-white"
                onClick={() => clickRSVP()}
              >
                I'm attending
              </button>
            )}
            {!isAttending && !deleted && (
              <button
                className="border-2 px-4 py-2 rounded"
                onClick={() => clickRSVP()}
              >
                RSVP
              </button>
            )}
          </div>
          {isHost && !deleted && (
            <button
              className="underline text-sm"
              onClick={() => setDisplayModal(true)}
            >
              delete
            </button>
          )}
          {isHost && deleted && <p className="text-sm text-red-600">deleted</p>}
        </div>
      </div>
      {displayModal && (
        <div
          className="h-screen w-screen fixed top-0 left-0 overflow-hidden"
          style={{ backgroundColor: "rgb(66, 66, 66, 0.4)" }}
        >
          <div id="modal" style={modalStyle}>
            <h2 className="text-2xl font-semibold mb-5">Are you sure?</h2>
            <p className="mb-10">
              Are you sure you want to delete this event?{" "}
              <span className="font-semibold">
                This action cannot be undone.
              </span>
            </p>
            <div className="flex flex-wrap justify-between">
              <button
                onClick={() => {
                  deleteEvent();
                }}
                className="text-white px-4 py-1 bg-red-700 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setDisplayModal(false)}
                className="underline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {displayConfirmation && (
        <div
          className="h-screen w-screen fixed top-0 left-0 overflow-hidden"
          style={{ backgroundColor: "rgb(66, 66, 66, 0.4)" }}
        >
          <div id="modal" style={modalStyle}>
            <h2 className="text-2xl font-semibold mb-5">Success</h2>
            <p className="mb-10">
              The event was successfully deleted. The changes will be shown when
              the page is refreshed.
            </p>

            <button
              onClick={() => setDisplayConfirmation(false)}
              className="underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
