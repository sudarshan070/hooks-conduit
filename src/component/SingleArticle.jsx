import React, { useState, useEffect } from "react";
import axios from "axios";
import User from "../media/user.png";

export default function SingleArticle(props) {
  let [article, setArticle] = useState(null);

  useEffect(() => {
    const { slug } = props.match.params;
    var articleUrl = `https://mighty-oasis-08080.herokuapp.com/api/articles/${slug}`;
    axios
      .get(articleUrl)
      .then((res) => {
        const article = res.data;
        setArticle(article);
      })
      .catch((err) => console.log(err));
  }, [props.match.params]);
  return (
    <div>
      {article ? (
        <div className="singleArticle-container">
          <div className="card-deck">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title text-center h4">
                  {article.article.title}
                </h4>
                <div className="d-flex align-items-center py-3">
                  {article.article.author.image ? (
                    <img
                      style={{ width: "75px", borderRadius: "50%" }}
                      src={article.article.author.image}
                      alt={article.article.author.username}
                    />
                  ) : (
                    <img src={User} alt="user" />
                  )}
                  <div className="ml-3">
                    <p className="author-name">
                      {article.article.author.username}
                    </p>
                    <p style={{ fontSize: "12px", color: "#777" }}>
                      {article.article.author.bio}
                    </p>
                    <span style={{ fontSize: "12px", color: "#777" }}>
                      {new Date(article.article.updatedAt).toDateString()}
                    </span>
                  </div>
                </div>
                <p className="card-text article-text mb-3">
                  {article.article.description}
                </p>
                <p className="card-text article-text">{article.article.body}</p>
                <div className="mt-3">
                  {article.article.tagList.map((tag, i) => {
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
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
