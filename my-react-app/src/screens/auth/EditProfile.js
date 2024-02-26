import React, { useEffect } from "react";
import AppLayout from "../../components/applayout/AppLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import EditProfileForm from "../../components/forms/EditProfile";

const EditProfile = () => {
  const navigate = useNavigate();
  const storedAuthToken = localStorage.getItem("authToken");
  const isLogged = storedAuthToken ? JSON.parse(storedAuthToken) : null;
  // const logggedUser = isLogged && jwtDecode(token);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const hasError =
    errors?.email || errors?.password || errors?.confirm_password;
  const postRequest = ({ email, name, image, password, confirm_password }) => {
    if (!hasError && !isLogged) {
      return;
    }
    console.log(email, name, image, password, confirm_password);
    // Perform your logic for resetting the password
    // For now, let's simulate success by redirecting to the home page
    // navigate("/");
  };

  useEffect(() => {
    reset({
      name: isLogged?.name,
      email: isLogged?.email,
      image: process.env.PUBLIC_URL + "/assets/images/profile.png",
    });
  }, []);

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
                  src={
                    process.env.PUBLIC_URL + `/assets/images/${isLogged?.image}`
                  }
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

export default EditProfile;
