import React from "react";

export default function Notification(props) {
  return (
    <>
      {props.type === "error" ? (
        <div className="text-center">
          <p className="text-danger">Somethings went wrong</p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-success">Successful</p>
        </div>
      )}
    </>
  );
}
