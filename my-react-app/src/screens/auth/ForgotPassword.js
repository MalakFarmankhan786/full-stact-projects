import React, { useState } from "react";
import AppLayout from "../../components/applayout/AppLayout";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ForgotPasswordForm from "../../components/forms/ForgotPassword";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const postRequest = async ({ email }) => {
    setMessage("");
    setIsLoading(true);
    if (!email) {
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      if (response.status === 200 || response.status === 201) {
        const data = await response.json();
        console.log("Success data:", data);
        setTimeout(() => {
          setIsLoading(false);
          navigate(`/reset-password/${data?.token}`);
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
            <div className="card-body">
              {(errors?.email || message) && (
                <div className="row mb-4 form-errors">
                  {message
                    ? message
                    : errors?.email
                    ? errors?.email?.message
                    : ""}
                </div>
              )}
              <ForgotPasswordForm
                handleSubmit={handleSubmit}
                postRequest={postRequest}
                register={register}
                errors={errors}
                isLoading={isLoading}
                message={message}
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ForgotPassword;
