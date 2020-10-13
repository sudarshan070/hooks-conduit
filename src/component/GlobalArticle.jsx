import Axios from "axios";
import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import { NavLink } from "react-router-dom";

export default function GlobalArticle() {
  let [article, setArticle] = useState(null);

  useEffect(() => {
    var articleUrl =
      "https://mighty-oasis-08080.herokuapp.com/api/articles?limit=9&offset=0";
    Axios.get(articleUrl)
      .then((res) => {
        const article = res.data;
        setArticle(article);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="card-deck d-flex flex-wrap">
      {/* {console.log(article)} */}
      {article ? (
        article.articles.map((article, i) => {
          const { title, updatedAt } = article;
          return (
            <div key={i} className="card-width">
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <div className="d-flex text-align-center py-3">
                  <div className="author-img mr-3">
                    <img
                      src={article.author.image}
                      alt={article.author.username}
                    />
                  </div>
                  <div>
                    <p className="author-name">{article.author.username}</p>
                    <span style={{ fontSize: "12px", color: "#777" }}>
                      {new Date(updatedAt).toDateString()}
                    </span>
                  </div>
                </div>

                <p className="card-text article-body">
                  {article.body.substring(0, 60) + "..."}
                </p>
                <div className="d-flex justify-content-end">
                  <NavLink
                    to={`/article/${article.slug}`}
                    type="button"
                    className="btn btn-link"
                  >
                    Read more
                  </NavLink>
                </div>

                <div className="mt-3">
                  {article.tagList.map((tag, i) => {
                    return (
                      <button
                        key={i}
                        type="button"
                        className="btn btn-sm btn-outline-secondary mr-1 "
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <Loading />
      )}
    </div>
  );
}
