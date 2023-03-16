import React from "react";
import dayjs from "dayjs";

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

  const handleLike = () => {
    setLikedPost(!likedPost);
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
            className="cursor-pointer"
          />
        ) : (
          <img
            src="./heart-full.svg"
            alt="like buton"
            onClick={() => handleLike()}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}
