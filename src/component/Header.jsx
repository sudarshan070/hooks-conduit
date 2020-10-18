import React from "react";
import { NavLink } from "react-router-dom";

const checkActive = (match, location) => {
  if (!location) return false;
  const { pathname } = location;
  return pathname === "/";
};

export default function Header(props) {
  return (
    <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light">
      <NavLink
        style={{ textDecoration: "none" }}
        to="/"
        className="logo"
        isActive={checkActive}
      >
        <h1>Conduit</h1>
      </NavLink>

      <div>
        {props.isLoggedIn ? (
          <AuthHeader handleLogout={props.handleLogout} />
        ) : (
          <NonAuthHeader />
        )}
      </div>
    </div>
  );
}

const AuthHeader = (props) => (
  <>
    <NavLink
      isActive={checkActive}
      to="/"
      type="button"
      className="btn btn-outline-primary"
    >
      Home
    </NavLink>

    <NavLink
      to="/addarticle"
      type="button"
      className="btn btn-outline-primary ml-3"
    >
      New Post
    </NavLink>

    <NavLink
      to="/profile"
      type="button"
      className="btn btn-outline-primary ml-3"
    >
      Profile
    </NavLink>

    <NavLink
      to="/login"
      type="button"
      onClick={props.handleLogout}
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
