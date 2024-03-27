import React, { useEffect, useState } from "react";
import AppLayout from "../../components/applayout/AppLayout";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import EditProfileForm from "../../components/forms/EditProfile";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

const EditProfile = (props) => {
  const [userProfile, setUserProfile] = useState();
  const [isError, setIsError] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [isSubmitSuccessfull, setIsSubmitSuccessfull] = useState(false);
  const [image, setImage] = useState("");

  const token = localStorage.getItem("authToken") ?? null;
  const decodedToken = token ? jwtDecode(token) : null;

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
    console.log(first_name, last_name, email, password, confirm_password);
    setIsError("");
    setIsSpinning(true);
    setIsSubmitSuccessfull(false);
    if (hasError || !token) {
      return;
    }
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirm_password", confirm_password);
    if (image) {
      formData.append("image", image);
    }
    // const URL = process.env.REACT_APP_API_URL+"/user-profile/";
    const URL = process.env.REACT_APP_API_URL
    try {
      // const response = await fetch(URL + decodedToken?.user_id, {
      const response = await fetch(URL+"/edit-profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "application/json",
        },
        body: formData,
      });
      if (response.status === 200) {
        const data = await response.json();
        setTimeout(() => {
          setUserProfile();
          setIsError(data?.msg);
          setIsSpinning(false);
          setIsSubmitSuccessfull(true);
          setImage("");
          reset({ image: "" });
          // props.getRequestToUserProfile(
          //   `http://localhost:8000/api/user-profile`,
          //   token
          // );
          props.getRequestToUserProfile(URL + "/user-profile", token);
        }, 1000);
      } else {
        const data = await response.json();
        setTimeout(() => {
          setIsSpinning(false);
          setIsError(data?.detail);
          console.log(data);
        }, 1000);
      }
    } catch (error) {
      setTimeout(() => {
        setIsSpinning(false);
        setIsError(error.toString());
      }, 2000);
    }
  };

  const onFocusField = () => {
    setIsError("");
    setIsSubmitSuccessfull(false);
  };
  useEffect(() => {
    if (props?.userProfile != userProfile) {
      setUserProfile(props?.userProfile);
      reset({
        first_name: props?.userProfile?.first_name,
        last_name: props?.userProfile?.last_name,
        email: props?.userProfile?.email,
      });
    }
  }, [props]);

  // console.log("props?.userProfile", props?.userProfile);
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
                  src={process.env.REACT_APP_BASE_URL + userProfile?.image}
                  // alt={product?.title}
                  alt={"No Image"}
                />
              </div>
              {/* )} */}
              {(hasError || isError) && (
                <div
                  className={`row mb-4 form-errors ${
                    isSubmitSuccessfull && "success"
                  }`}
                >
                  {isError
                    ? isError
                    : errors?.email
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
                isSpinning={isSpinning}
                onFocusField={onFocusField}
                setImage={setImage}
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

const mapDispatchToProps = (dispatch) => {
  return {
    getRequestToUserProfile: (url, token) =>
      dispatch(actionCreators.getRequestToUserProfileDispatch(url, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
