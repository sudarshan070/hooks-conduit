import React from "react";

export default function Profile(props) {
  return (
    <>
      {console.log(props.userInfo)}
      {props.userInfo ? (
        <div>
          <p>{props.userInfo.user.username}</p>
          <p>{props.userInfo.user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
