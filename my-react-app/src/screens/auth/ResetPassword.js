import React from "react";
import AppLayout from "../../components/applayout/AppLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import ResetPasswordForm from "../../components/forms/ResetPassword"
const ResetPassword = () => {
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const postRequest = ({ password, confirm_password }) => {
    if (!password && !confirm_password && params?.userId) {
      return;
    }
    console.log(password, confirm_password, params?.userId);
    // Perform your logic for resetting the password
    // For now, let's simulate success by redirecting to the home page
    // navigate("/");
  };

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
              {(errors?.password || errors?.confirm_password) && (
                <div className="row mb-4 form-errors">
                  {errors?.password
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
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ResetPassword;
