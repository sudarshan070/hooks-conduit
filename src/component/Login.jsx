import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Formik } from "formik";
import Axios from "axios";
import Notification from "./Notification";

const Login = (props) => (
  <div>
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors = {};
        const success = {};

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
        } else if (values.password.length < 5) {
          errors.password = "Password must be 8 characters long.";
        } else if (!passwordRegex.test(values.password)) {
          errors.password = "Invalid password. Must contain one number.";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        Axios.post("https://mighty-oasis-08080.herokuapp.com/api/users/login", {
          user: values,
        })
          .then((res) => {
            localStorage.setItem("token", res.data.user.token);
            props.setIsLoggedIn(true);
            props.history.push("/");
          })
          .catch((error) => props.history.push("/login"));
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
              <h2>SignIn conduit</h2>
              <form onSubmit={handleSubmit}>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="16"
                  height="16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.679 7.932c.412-.621 1.242-1.75 2.366-2.717C5.175 4.242 6.527 3.5 8 3.5c1.473 0 2.824.742 3.955 1.715 1.124.967 1.954 2.096 2.366 2.717a.119.119 0 010 .136c-.412.621-1.242 1.75-2.366 2.717C10.825 11.758 9.473 12.5 8 12.5c-1.473 0-2.824-.742-3.955-1.715C2.92 9.818 2.09 8.69 1.679 8.068a.119.119 0 010-.136zM8 2c-1.981 0-3.67.992-4.933 2.078C1.797 5.169.88 6.423.43 7.1a1.619 1.619 0 000 1.798c.45.678 1.367 1.932 2.637 3.024C4.329 13.008 6.019 14 8 14c1.981 0 3.67-.992 4.933-2.078 1.27-1.091 2.187-2.345 2.637-3.023a1.619 1.619 0 000-1.798c-.45-.678-1.367-1.932-2.637-3.023C11.671 2.992 9.981 2 8 2zm0 8a2 2 0 100-4 2 2 0 000 4z"
                  ></path>
                </svg>
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
                <NavLink to="/register" style={{ textDecoration: "none" }}>
                  Can't log in? Sign up for an account
                </NavLink>
              </div>
            </div>
          </div>

          <Notification type="success" />
        </div>
      )}
    </Formik>
  </div>
);

export default withRouter(Login);
