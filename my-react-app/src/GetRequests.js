import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions/index";
import { jwtDecode } from "jwt-decode";

const AllGetRequest = (props) => {
  const token = localStorage.getItem("authToken") ?? null;
  const decodedToken = token? jwtDecode(token) : null


 
  useEffect(() => {


    if (token) {

      // Dispatch the actions when the component mounts
      props.getRequestToUserProfile(process.env.REACT_APP_API_URL+"/user-profile",token);
      // props.getRequestToUserProfile(`http://localhost:8000/api/user-profile/${decodedToken?.user_id}`,token);
    }

    


    // props.getRequestToProducts(`http://localhost:8000/api/products`);
  }, []);

  return null; // or some JSX if needed
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRequestToUserProfile: (url,token) =>
      dispatch(actionCreators.getRequestToUserProfileDispatch(url,token)),

    getRequestToProducts: (url) =>
      dispatch(actionCreators.getRequestToProductsDispatch(url)),
  };
};

export default connect(null, mapDispatchToProps)(AllGetRequest);
