import Axios from "axios";
import React, { useState, useEffect } from "react";
import Tag from "./Tag";
import Loading from "./Loading";

export default function HomePage() {
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
    <div className="card-padding">
      <Tag />
      <div className="card-deck ">
        {article ? (
          article.articles.map((article, i) => {
            return (
              <div key={i} className="card">
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <div className="d-flex text-align-center py-3">
                    <div className="author-img mr-3">
                      <img
                        src={article.author.image}
                        alt={article.author.username}
                      />
                    </div>
                    <p className="author-name">{article.author.username}</p>
                  </div>

                  <p className="card-text">{article.body}</p>
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
    </div>
  );
}
