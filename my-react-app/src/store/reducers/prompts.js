import * as actionTypes from "../actions/actionTypes";

const initialState = {
  prompt_list: [],
  showSuccessModal: false,
};

const executeGetRequestOFPrompts = (state, action) => {
  return {
    ...state,
    prompt_list: action.data,
    showSuccessModal: true,
  };
};

const executeDeleteRequestOfPrompt = (state) => {
  return {
    ...state,
    showSuccessModal: true,
  };
};


const prompts = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_REQUEST_TO_PROMPTS:
      return executeGetRequestOFPrompts(state, action);
    case actionTypes.DELETE_REQUEST_TO_PROMPT: 
      return executeDeleteRequestOfPrompt(state);

    default:
      return state;
  }
};

export default prompts;
