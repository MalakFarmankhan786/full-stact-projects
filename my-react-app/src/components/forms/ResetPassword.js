import React from "react";

const ResetPassword = (props) => {
  return (
    <form onSubmit={props?.handleSubmit(props?.postRequest)}>
      <div className="row mb-4">
        <input
          {...props?.register("password", {
            required: "Password field is required!",
            minLength: {
              value: 5,
              message: "Password should be 5 characters long!",
            },
          })}
          type="password"
          className={`form-control ${props?.errors?.password && "invalid"}`}
          placeholder="Password"
        />
      </div>
      <div className="row mb-4">
        <input
          {...props?.register("confirm_password", {
            required: "Confirm password field is required!",
            minLength: {
              value: 5,
              message: "Password should be 5 characters long!",
            },
            validate: (value) => {
              const { password } = props?.getValues();
              return (
                password === value ||
                "Password and Confirm password should match!"
              );
            },
          })}
          type="password"
          className={`form-control ${
            props?.errors?.confirm_password && "invalid"
          }`}
          placeholder="Confirm Password"
        />
      </div>
      <div className="grid">
        <button
          type={props?.isLoading ? "button" : "submit"}
          className="btn w-25 fw-bold"
        >
          {props?.isLoading ? "Loading..." : "Reset"}
        </button>
      </div>
    </form>
  );
};

export default ResetPassword;
