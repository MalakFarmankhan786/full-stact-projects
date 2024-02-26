import * as actionTypes from "../actionTypes";

const getRequestToProducts = (data) => ({
  type: actionTypes.GET_REQUEST_TO_PRODUCTS,
  data: data,
});

export const getRequestToProductsDispatch = (url) => async (dispatch) => {
  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((result) => {
      console.log(result?.products);
      dispatch(getRequestToProducts(result?.products));
    })
    .catch((err) => console.log(err));
};
