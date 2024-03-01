import React, { useEffect, useState } from "react";
import AppLayout from "../../components/applayout/AppLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import ResetPasswordForm from "../../components/forms/ResetPassword";
const ResetPassword = () => {
  const [tokenExists, setTokenExists] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const postRequest = async ({ password, confirm_password }) => {
    setMessage("");
    setIsLoading(true);
    if (!password || !confirm_password || !params?.token) {
      return;
    }

    // Perform your logic for resetting the password
    try {
      const response = await fetch("http://localhost:8000/api/reset-password", {
        method: "POST",
        body: JSON.stringify({
          password,
          confirm_password,
          token: params?.token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        const data = await response.json();
        console.log("Success data:", data);
        setTimeout(() => {
          setIsLoading(false);
          navigate("/login");
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
  const postRequestToToken = async (token) => {
    if (!token) {
      navigate("/");
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/api/check-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
        }),
      });
      if (response.status === 200 || response.status === 201) {
        const data = await response.json();
        if (data?.tokenExist) {
          navigate(`/reset-password/${data?.token}`);
        }
        setTokenExists(data?.token);
      } else {
        const data = await response.json();
        setTokenExists(data?.tokenExist);
        navigate("/");
      }
    } catch (error) {
      setTokenExists(false);
      navigate("/");
    }
  };
  useEffect(() => {
    if (params?.token) {
      postRequestToToken(params?.token);
    } else {
      navigate("/");
    }
  }, [params.token]); // Adding params.token to the dependency array
  return (
    <AppLayout>
      <div className="row grid">
        <div className="col-lg-5 col-md-5 col-sm-12 col-xl-5">
          <div className="card overflow-hidden">
            <div
              className="card-header grid fw-bold"
              style={{ color: "#007ea7" }}
            >
              Reset Your Password
            </div>
            <div className="card-body">
              {(errors?.password || errors?.confirm_password || message) && (
                <div className="row mb-4 form-errors">
                  {message
                    ? message
                    : errors?.password && errors?.confirm_password
                    ? "All fields are required!"
                    : errors?.password
                    ? errors?.password?.message
                    : errors?.confirm_password
                    ? errors?.confirm_password?.message
                    : "All fields are required!"}
                </div>
              )}
              <ResetPasswordForm
                handleSubmit={handleSubmit}
                postRequest={postRequest}
                register={register}
                getValues={getValues}
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

export default ResetPassword;
