import React from "react";

const EditProfile = ({
  handleSubmit,
  postRequest,
  register,
  errors,
  getValues,
  onFocusField,
  isSpinning,
  setImage,
}) => {
  return (
    <form onSubmit={handleSubmit(postRequest)}>
      <div className="row mb-4">
        <input {...register("image")} type="file" className={`form-control`} onChange={e=>setImage(e.target.files[0])}/>
      </div>
      <div className="row mb-4">
        <input
          {...register("first_name")}
          type="text"
          className={`form-control`}
          placeholder="Enter First Name"
          onFocus={onFocusField}
        />
      </div>
      <div className="row mb-4">
        <input
          {...register("last_name")}
          type="text"
          className={`form-control `}
          placeholder="Enter Last Name"
          onFocus={onFocusField}
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
          placeholder="Enter Your New Email"
          onFocus={onFocusField}
        />
      </div>

      {/* <div className="row mb-4">
        <input
          {...register("name")}
          type="text"
          className={`form-control`}
          placeholder="Enter Your New Name"
        />
      </div> */}
      <div className="row mb-4">
        <input
          {...register("password", {
            minLength: {
              value: 5,
              message: "Password should be 5 characters long!",
            },
          })}
          type="password"
          className={`form-control ${errors?.password && "invalid"}`}
          placeholder="Enter Your New Password"
          onFocus={onFocusField}
        />
      </div>
      <div className="row mb-4">
        <input
          {...register("confirm_password", {
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
          placeholder="Confirm Password (agian)"
          onFocus={onFocusField}
        />
      </div>
      <div className="grid">
        <button
          type={!isSpinning ? `submit` : "button"}
          className="btn w-25 fw-bold"
        >
          {!isSpinning ? `Edit` : "Loading..."}
        </button>
      </div>
    </form>
  );
};

export default EditProfile;
