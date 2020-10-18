import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Formik } from "formik";
import Axios from "axios";

const Login = (props) => (
  <div>
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors = {};

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
            console.log(res.data.user);
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
                {errors.email && touched.email && errors.email}

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
                {errors.password && touched.password && errors.password}
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
        </div>
      )}
    </Formik>
  </div>
);

export default withRouter(Login);
