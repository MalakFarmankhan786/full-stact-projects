import * as actionTypes from "../actions/actionTypes";

const initialState = {
  products: [],
  showSuccessModal: false,
};

const executeGetRequestOfProducts = (state, action) => {
  return {
    ...state,
    products: action.data,
    showSuccessModal: true,
  };
};


const product = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_REQUEST_TO_PRODUCTS:
      return executeGetRequestOfProducts(state, action);

    default:
      return state;
  }
};

export default product;
