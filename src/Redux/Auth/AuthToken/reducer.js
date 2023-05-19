import {
  GET_TOKEN_ERROR,
  GET_TOKEN_REQUEST,
  GET_TOKEN_SUCCESS,
} from "./action";

let initState = { TOKEN: {} };

export const getUserTOKENReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_TOKEN_SUCCESS:
      return {
        ...state,

        TOKEN: action.payload,
      };
    case GET_TOKEN_ERROR:
      return {
        ...state,

        TOKEN: [],
      };
    default:
      return state;
  }
};
