import React from "react";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";
import Axios from "axios";

const AddArticle = (props) => (
  <div>
    <div className="article-heading">
      <h1>Add Article</h1>
    </div>
    <Formik
      initialValues={{ body: "", title: "", tagList: "", description: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.body) {
          errors.body = "Required";
        }

        if (!values.title) {
          errors.title = "Required";
        }

        if (!values.description) {
          errors.description = "Required";
        } else if (values.description.length < 10) {
          errors.description = "At list 10 char. needs";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        var addArticleUrl = `https://mighty-oasis-08080.herokuapp.com/api/articles`;
        Axios.post(
          addArticleUrl,
          { article: values },
          { headers: { authorization: `Token ${localStorage.token}` } }
        )
          .then((res) => {
            props.history.push("/");
          })
          .catch((err) => console.log(err));
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="addArticle-container">
            <div className="form-group">
              <label htmlFor="body">Article Title</label>
              <input
                className="form-control"
                type="text"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              <p className="text-danger">
                {errors.title && touched.title && errors.title}
              </p>
            </div>
            <div className="form-group">
              <label htmlFor="body">Write your article</label>
              <textarea
                className="form-control"
                id="body"
                type="text"
                name="body"
                rows="3"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.body}
              />
              <p className="text-danger">
                {errors.body && touched.body && errors.body}
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="body">Add Article Description</label>
              <input
                className="form-control"
                type="text"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />
              <p className="text-danger">
                {errors.description &&
                  touched.description &&
                  errors.description}
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="body">Add tags</label>
              <input
                className="form-control"
                type="text"
                name="tagList"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.tagList}
              />
              <p className="text-danger">
                {errors.tagList && touched.tagList && errors.tagList}
              </p>
            </div>
            <button
              type="submit"
              className="btn btn-success"
              disabled={isSubmitting}
            >
              Add Article
            </button>
          </div>
        </form>
      )}
    </Formik>
  </div>
);

export default withRouter(AddArticle);
