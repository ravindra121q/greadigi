import { ADD_DATA_ERROR, ADD_DATA_REQUEST, ADD_DATA_SUCCESS } from "./action";

let initState = {
  loading: false,
  msg: [],
  error: false,
};

export const addSectionsDataReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload.data,
      };
    case ADD_DATA_ERROR:
      return {
        ...state,
        loading: false,
        msg: [],
        error: true,
      };
    default:
      return state;
  }
};
