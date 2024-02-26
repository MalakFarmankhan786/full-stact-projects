import React from "react";
import AppLayout from "../../components/applayout/AppLayout";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ForgotPasswordForm from "../../components/forms/ForgotPassword";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const postRequest = ({ email }) => {
    if (!email) {
      return;
    }
    console.log(email)
    // Perform your logic for sending a reset password email
    // For now, let's simulate success by storing a dummy value in localStorage
    navigate("/reset-password"); // Redirect to the reset password page
  };

  return (
    <AppLayout>
      <div className="row grid">
        <div className="col-lg-5 col-md-5 col-sm-12 col-xl-5">
          <div className="card overflow-hidden">
            <div className="card-body">
              <ForgotPasswordForm
                handleSubmit={handleSubmit}
                postRequest={postRequest}
                register={register}
                errors={errors}
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ForgotPassword;
