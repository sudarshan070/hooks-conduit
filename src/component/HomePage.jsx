import React from 'react'
import Tag from "./Tag";
import { NavLink } from "react-router-dom";
import GlobalArticle from "./GlobalArticle";


export default function HomePage(props) {
  return (
    <div className="card-padding">
      <Tag />
      <div
        style={{
          padding: " 1.5rem 0",
          textAlign: "center",
          fontSize: "1.2rem",
        }}
      >
        {props.isLoggedIn ? <MyFeed /> : <GlobalFeed />}
      </div>
      <GlobalArticle />
    </div>
  );
}

const GlobalFeed = (props) => (
  <>
    <NavLink to="/">Global Feed</NavLink>
  </>
);

const MyFeed = (props) => (
  <>
    <NavLink to="/" activeClassName="active" style={{ marginRight: "0.8rem" }}>
      Global Feed
    </NavLink>
    <NavLink to="/myFeed" activeClassName="active">
      My Feed
    </NavLink>
  </>
);
