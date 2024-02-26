import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions/index";

const AllGetRequest = (props) => {
  useEffect(() => {
    // Dispatch the actions when the component mounts
    // props.getRequestToProducts(`http://localhost:8080/api/products`);
    // props.getRequestToPrompts(`prompts/`);
  }, [props.getRequestToCategories, props.getRequestToPrompts]);

  return null; // or some JSX if needed
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRequestToProducts: (url) =>
      dispatch(actionCreators.getRequestToProductsDispatch(url)),
  };
};

export default connect(null, mapDispatchToProps)(AllGetRequest);
