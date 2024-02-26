import React from "react";

const Signup = ({
  handleSubmit,
  postRequest,
  register,
  setSuccessMessage,
  getValues,
  isLoading,
  errors,
}) => {
  const handleFieldFocus = () => {
    // Reset the success message when any field is focused
    setSuccessMessage("");
  };
  return (
    <form onSubmit={handleSubmit(postRequest)}>
      <div className="row mb-4">
        <input
          {...register("first_name")}
          type="text"
          className={`form-control`}
          placeholder="Enter First Name"
          onFocus={handleFieldFocus} // Add onFocus event handler
        />
      </div>
      <div className="row mb-4">
        <input
          {...register("last_name")}
          type="text"
          className={`form-control `}
          placeholder="Enter Last Name"
          onFocus={handleFieldFocus} // Add onFocus event handler
        />
      </div>
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
          placeholder="Enter Email"
          onFocus={handleFieldFocus} // Add onFocus event handler
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
          onFocus={handleFieldFocus} // Add onFocus event handler
        />
      </div>
      <div className="row mb-4">
        <input
          {...register("confirm_password", {
            required: {
              value: true,
              message: "Confirm password field is required!",
            },
            minLength: {
              value: 5,
              message: "Password should be 5 characters long!",
            },
            validate: (value) => {
              const { password } = getValues();
              return (
                password === value ||
                "Password and Confirm password should match!"
              );
            },
          })}
          type="password"
          className={`form-control ${errors?.confirm_password && "invalid"}`}
          placeholder="Confirm Password"
          onFocus={handleFieldFocus} // Add onFocus event handler
        />
      </div>
      <div className="grid">
        <button
          type={isLoading ? "button" : "submit"}
          className="btn w-25 fw-bold"
        >
          {isLoading ? "Loading..." : "Register"}
        </button>
      </div>
    </form>
  );
};

export default Signup;
