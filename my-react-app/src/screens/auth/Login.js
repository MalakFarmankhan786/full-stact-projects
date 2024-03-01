import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "../../components/applayout/AppLayout";
import LoginForm from "../../components/forms/Login";
import usersData from "./users.json";

const Login = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const postRequest = async ({ email, password }) => {
    setMessage("");
    setIsLoading(true);
    if (!email || !password) {
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (response.status === 200 || response.status === 201) {
        const data = await response.json();
        console.log("Success data:", typeof data.access_token);

        
        setTimeout(() => {
          setIsLoading(false);
          localStorage.setItem("authToken", data.access_token);
          navigate("/edit-profile");
          reset();
        }, 1000);
      } else {
        const data = await response.json();
        console.log("Error data:", data);
        setTimeout(() => {
          setMessage(data.detail);
          setIsLoading(false);
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error);
      setTimeout(() => {
        setMessage(error.toString());
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <AppLayout>
      <div className="row grid">
        <div className="col-lg-5 col-md-5 col-sm-12 col-xl-5">
          <div className="card overflow-hidden">
            <div className="card-header grid">
              <p className="text-dark mb-0 fw-bold">
                If you are not a member?{" "}
                <Link
                  to="/signup"
                  className="mb-0"
                  style={{ color: "#007ea7" }}
                >
                  Signup
                </Link>
              </p>
            </div>
            <div className="card-body">
              {(errors?.email || errors?.password || message) && (
                <div className="row mb-4 form-errors">
                  {message
                    ? message
                    : errors?.email && errors?.password
                    ? "All fields are required!"
                    : errors?.email
                    ? errors?.email?.message
                    : errors?.password
                    ? errors?.password?.message
                    : ""}
                </div>
              )}
              <LoginForm
                handleSubmit={handleSubmit}
                postRequest={postRequest}
                register={register}
                errors={errors}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Login;
