import * as actionTypes from "../actionTypes";

const getRequestToUserProfile = (data) => ({
  type: actionTypes.GET_REQUEST_TO_USER_PROFILE,
  data: data,
});

export const getRequestToUserProfileDispatch =
  (url, token) => async (dispatch) => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const data = await response.json();

        dispatch(getRequestToUserProfile(data?.user));
      }
    } catch (error) {
      console.log(error);
    }

    //   fetch(url)
    //     .then((res) => {
    //       if (res.status === 200) {
    //         return res.json();
    //       }
    //     })
    //     .then((result) => {
    //       console.log(result?.products);
    //       dispatch(getRequestToUserProfile(result?.products));
    //     })
    //     .catch((err) => console.log(err));
  };
