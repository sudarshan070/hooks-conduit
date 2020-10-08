import React from "react";

export default function Header() {
  return (
    <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light">
      <div className="logo">
        <h1>Conduit</h1>
      </div>
      <div>
        <button type="button" className="btn btn-outline-primary">
          Login
        </button>
        <button type="button" className="btn btn-outline-success ml-3">
          SignUp
        </button>
      </div>
    </div>
  );
}
