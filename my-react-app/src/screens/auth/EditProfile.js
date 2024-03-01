import React, { useEffect, useState } from "react";
import AppLayout from "../../components/applayout/AppLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import EditProfileForm from "../../components/forms/EditProfile";
import { connect } from "react-redux";

const EditProfile = (props) => {
  const navigate = useNavigate();
  const isLogged = localStorage.getItem("authToken") ?? null;
  const [userProfile, setUserProfile] = useState({});

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const hasError =
    errors?.email || errors?.password || errors?.confirm_password;
  const postRequest = async ({
    first_name,
    last_name,
    email,
    password,
    confirm_password,
  }) => {
    if (hasError || !isLogged) {
      return;
    }
    console.log(first_name, last_name, email, password, confirm_password);
    try {
      const response = await fetch("");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (props?.userProfile != userProfile) {
      setUserProfile(props?.userProfile);
      reset({
        first_name: userProfile?.first_name,
        last_name: userProfile?.last_name,
        email: userProfile?.email,
        // image: process.env.PUBLIC_URL + "/assets/images/profile.png",
      });
    }
  }, [props?.userProfile]);

  return (
    <AppLayout>
      <div className="row grid">
        <div className="col-lg-5 col-md-5 col-sm-12 col-xl-5">
          <div className="card overflow-hidden">
            <div
              className="card-header grid fw-bold"
              style={{ color: "#007ea7" }}
            >
              Edit Your Profile
            </div>
            <div className="card-body">
              {/* {params?.productId && ( */}
              <div className="row mb-4 grid" style={{ marginTop: "-10px" }}>
                <img
                  style={{
                    width: "100px",
                    height: "80px",
                    borderRadius: "100%",
                    marginLeft: "-10px",
                  }}
                  src={process.env.PUBLIC_URL + `/assets/images/profile-1.jpeg`}
                  // alt={product?.title}
                  alt={"No Image"}
                />
              </div>
              {/* )} */}
              {hasError && (
                <div className="row mb-4 form-errors">
                  {errors?.email
                    ? errors?.email?.message
                    : errors?.password
                    ? errors?.password?.message
                    : errors?.confirm_password
                    ? errors?.confirm_password?.message
                    : ""}
                </div>
              )}
              <EditProfileForm
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
const mapStateToProps = (state) => {
  return {
    userProfile: state.userProfile.userProfileData,
  };
};
export default connect(mapStateToProps)(EditProfile);
