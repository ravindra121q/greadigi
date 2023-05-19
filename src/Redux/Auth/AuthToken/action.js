//action types
export const GET_TOKEN_REQUEST = "GET_TOKEN_REQUEST";
export const GET_TOKEN_SUCCESS = "GET_TOKEN_SUCCESS";
export const GET_TOKEN_ERROR = "GET_TOKEN_ERROR";

//actions
const getTOKENRequest = () => ({
  type: GET_TOKEN_REQUEST,
});

export const getTOKENSuccess = (payload) => ({
  type: GET_TOKEN_SUCCESS,
  payload,
});

const getTOKENError = () => ({
  type: GET_TOKEN_ERROR,
});

//getting TOKEN;
