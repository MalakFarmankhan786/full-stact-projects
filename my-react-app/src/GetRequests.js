import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions/index";

const AllGetRequest = (props) => {
  const token = localStorage.getItem("authToken") ?? null;
  useEffect(() => {
    if (token) {
      // Dispatch the actions when the component mounts
      props.getRequestToUserProfile(`http://localhost:8000/api/user-profile`,token);
    }

    // props.getRequestToProducts(`http://localhost:8000/api/products`);
  }, [props]);

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
