import React from "react";
import dayjs from "dayjs";
import axios from "axios";
import { useEffect } from "react";

export default function GroupPost(props) {
  const style = {
    width: "45%",
    minHeight: "200px",
    minWidth: "300px",
    boxShadow: "rgba(236, 236, 236, 0.44) 0px 0px 15px",
    border: "1px solid #f8f4ef",
    background: "#fff",
  };

  const d = dayjs(props.creationDate).format("MMMM D, YYYY");
  const [likedPost, setLikedPost] = React.useState(false);
  const [numLikes, setNumLikes] = React.useState(0);

  useEffect(() => {
    //Call api to get the number of likes on this post
    axios.post("/api/getPostLikes", { postID: props.postID }).then((res) => {
      console.log("likes:", res.data);
      setNumLikes(res.data.length);
    });

    //Call api to check if the user liked the post or not
    axios
      .post("/api/checkIfLiked", { postID: props.postID, username: "lola" })
      .then((res) => {
        console.log("if liked:", res.data[0]["COUNT(1)"]);
        const ifLiked = res.data[0]["COUNT(1)"];
        if (ifLiked) {
          setLikedPost(true);
        }
      });
  }, []);

  const handleLike = () => {
    setLikedPost(!likedPost);

    //unliking a post
    if (likedPost) {
      setNumLikes(numLikes - 1);
      //Call api to delete the like from the database
      axios.post("/api/deleteLike", { postID: props.postID, username: "lola" });
    } else {
      //liking a post
      setNumLikes(numLikes + 1);
      //Call api to add a like to the database
      axios.post("/api/addLike", { postID: props.postID, username: "lola" });
    }
  };

  return (
    <div style={style} className="mr-5 mb-5 p-5">
      <h1 className="text-2xl font-semibold">{props.title}</h1>
      <p className="text-sm mt-1">
        posted by{" "}
        <span className="font-semibold text-base">{props.username}</span> on{" "}
        <span className="font-semibold text-base">{d}</span>
      </p>
      <p className="mt-5">{props.description}</p>
      <div className="mt-5">
        {!likedPost ? (
          <img
            src="./heart-empty(1).svg"
            alt="like buton"
            onClick={() => handleLike()}
            className="cursor-pointer inline"
          />
        ) : (
          <img
            src="./heart-full.svg"
            alt="like buton"
            onClick={() => handleLike()}
            className="cursor-pointer inline"
          />
        )}
        <span className="ml-1 pt-1 align-middle ">{numLikes}</span>
      </div>
    </div>
  );
}
