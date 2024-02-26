import React from "react";
import { Link } from "react-router-dom";
const Login = ({handleSubmit,postRequest,register,errors,isLoading}) => {
  return (
    <form onSubmit={handleSubmit(postRequest)}>
      <div className="row mb-4">
        <input
          {...register("email", {
            required: {
              value: true,
              message: "Email field is required!",
            },
            pattern: {
              value:
                /^(?!.*\.\.)[a-zA-Z][^\s@]*@(?!.*\.\.)[^\s@]+(\.[^\s@]+)+[^\W\d_][^\W\s\d]*$/,
              message: "Email should be valid!",
            },
          })}
          type="email"
          className={`form-control ${errors?.email && "invalid"}`}
          placeholder="Email"
        />
      </div>
      <div className="row mb-4">
        <input
          {...register("password", {
            required: {
              value: true,
              message: "Password field is required!",
            },
            minLength: {
              value: 5,
              message: "Password should be 5 characters long!",
            },
          })}
          type="password"
          className={`form-control ${errors?.password && "invalid"}`}
          placeholder="Password"
        />
      </div>
      <div className="row mb-4 text-end">
        <p>
          <Link
            to="/forgot-password"
            style={{ color: "#007ea7" }}
            className="fw-bold"
          >
            Forgot Password?
          </Link>
        </p>
      </div>
      <div className="grid">
        <button
          type={isLoading ? "button" : "submit"}
          className="btn w-25 fw-bold"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </div>
    </form>
  );
};

export default Login;
