import Axios from "axios";
import React, { useState, useEffect } from "react";

export default function Tag() {
  let [tag, setTag] = useState(null);

  useEffect(() => {
    const tagUrl = "https://mighty-oasis-08080.herokuapp.com/api/tags";
    Axios.get(tagUrl)
      .then((res) => {
        const tag = res.data;
        setTag(tag);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="d-flex pb-3 flex-wrap">
      {tag ? (
        tag.tags.map((tag, i) => {
          return (
            <button
              key={i}
              type="button"
              className="btn btn-outline-secondary ml-1 mb-1"
            >
              {tag}
            </button>
          );
        })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
