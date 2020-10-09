import React from "react";
import { NavLink } from "react-router-dom";

export default function Header(props) {
  return (
    <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light">
      <NavLink style={{ textDecoration: "none" }} to="/" className="logo">
        <h1>Conduit</h1>
      </NavLink>

      <div>{props.isLoggedIn ? <AuthHeader /> : <NonAuthHeader />}</div>
    </div>
  );
}

const AuthHeader = (props) => (
  <>
    <button type="button" className="btn btn-outline-info ml-3">
      Info
    </button>
    <NavLink
      to="/register"
      type="button"
      className="btn btn-outline-danger ml-3"
    >
      Logout
    </NavLink>
  </>
);

const NonAuthHeader = (props) => (
  <>
    <NavLink to="/login" type="button" className="btn btn-outline-primary">
      Login
    </NavLink>
    <NavLink
      to="/register"
      type="button"
      className="btn btn-outline-primary ml-3"
    >
      SignUp
    </NavLink>
  </>
);
