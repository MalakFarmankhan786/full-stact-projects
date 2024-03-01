import * as actionTypes from "../actions/actionTypes";

const initialState = {
  userProfileData: [],
  showSuccessModal: false,
};

const executeGetRequestOfUserProfile = (state, action) => {
  return {
    ...state,
    userProfileData: action.data,
    showSuccessModal: true,
  };
};

const userProfile = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_REQUEST_TO_USER_PROFILE:
      return executeGetRequestOfUserProfile(state, action);

    default:
      return state;
  }
};

export default userProfile;
