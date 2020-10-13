import React from "react";
import { NavLink } from "react-router-dom";
import { Formik } from "formik";
import Axios from "axios";

const SignUp = (props) => (
  <div>
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validate={(values) => {
        const errors = {};

        if (!values.username) {
          errors.username = "Required";
        }

        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }

        const passwordRegex = /(?=.*[0-9])/;
        if (!values.password) {
          errors.password = "Required";
        } else if (values.password.length < 8) {
          errors.password = "Password must be 8 characters long.";
        } else if (!passwordRegex.test(values.password)) {
          errors.password = "Invalid password. Must contain one number.";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        Axios.post("https://mighty-oasis-08080.herokuapp.com/api/users", {
          user: values,
        })
          .then((res) => props.history.push("/login"))
          .catch((error) => console.log(error));
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
        <div className="signUp-form">
          <div className="form-wrapper">
            <div className="form-box">
              <h2>SignUp in conduit</h2>
              <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                  Username <span className="text-danger">*</span>
                </label>
                <input
                  className="signUp-form-input login-form-input"
                  type="text"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
                <p className="text-danger">
                  {errors.username && touched.username && errors.username}
                </p>

                <label htmlFor="email">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  className="signUp-form-input login-form-input"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <p className="text-danger">
                  {errors.email && touched.email && errors.email}
                </p>

                <label htmlFor="password">
                  Password <span className="text-danger">*</span>
                </label>
                <input
                  className="signUp-form-input login-form-input"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <p className="text-danger">
                  {errors.password && touched.password && errors.password}
                </p>

                <button
                  className="form-btn login-btn bg-success"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </form>
              <div className="signUp-link">
                <NavLink to="/login" style={{ textDecoration: "none" }}>
                  Already have an account? Log In
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  </div>
);

export default SignUp;
