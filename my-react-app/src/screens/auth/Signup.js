import React, { useEffect, useState } from "react";
import AppLayout from "../../components/applayout/AppLayout";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import SignUpForm from "../../components/forms/Signup";

const Register = (props) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const watchedFields = watch([
    "first_name",
    "last_name",
    "email",
    "password",
    "confirm_password",
  ]); // Pass an array of field names to watch

  const postRequest = async ({
    first_name,
    last_name,
    email,
    password,
    confirm_password,
  }) => {
    setSuccessMessage("");
    setMessage("");
    setIsLoading(true);
    if (!email || !password || !confirm_password) {
      return;
    }
    try {
      const response = await fetch(process.env.REACT_APP_API_URL+"/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          password,
          confirm_password,
          // "password2":confirm_password,
          "is_staff": false,
        }),
      });
      if (response.status === 200 || response.status === 201) {
        const data = await response.json();
        setTimeout(() => {
          setSuccessMessage(data.message);
          reset();
          setIsLoading(false);
        }, 1000);
      } else {
        const data = await response.json();
        setTimeout(() => {
          setMessage(data.detail);
          setIsLoading(false);
        }, 1000);
      }
    } catch (error) {
      setTimeout(() => {
        // setMessage(error.toString()); // or setMessage(error.message)
        setIsLoading(false);
      }, 1000);
    }
  };

  // useEffect(() => {
  //   console.log(isValid,"useEffect")
  //   if (isValid) {
  //     setSuccessMessage("");
  //     // setMessage("")
  //   }
  // }, [watchedFields]);
  return (
    <AppLayout>
      <div className="row grid">
        <div className="col-lg-5 col-md-5 col-sm-12 col-xl-5">
          <div className="card overflow-hidden">
            <div className="card-header grid">
              <p className="text-dark mb-0 fw-bold">
                If you have already an account?{" "}
                <Link to="/login" style={{ color: "#007ea7" }}>
                  Login
                </Link>
              </p>
            </div>
            <div className="card-body">
              {(errors?.email ||
                errors?.password ||
                errors?.confirm_password ||
                successMessage ||
                message) && (
                <div
                  className={`row mb-4 form-errors ${
                    successMessage  && "success"
                  }`}
                >
                  {errors?.email && errors?.password && errors?.confirm_password
                    ? "All fields are required!"
                    : successMessage
                    ? successMessage
                    : message
                    ? message
                    : errors?.email
                    ? errors?.email?.message
                    : errors?.password
                    ? errors?.password?.message
                    : errors?.confirm_password
                    ? errors?.confirm_password?.message
                    : ""}
                </div>
              )}
              <SignUpForm
                handleSubmit={handleSubmit}
                postRequest={postRequest}
                register={register}
                getValues={getValues}
                errors={errors}
                isLoading={isLoading}
                setSuccessMessage={setSuccessMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Register;
