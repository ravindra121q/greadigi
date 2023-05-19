//action types
export const GET_DATA_REQUEST = "GET_DATA_REQUEST";
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
export const GET_DATA_ERROR = "GET_DATA_ERROR";

//actions
const getDataRequest = () => ({
  type: GET_DATA_REQUEST,
});

const getDataSuccess = (payload) => ({
  type: GET_DATA_SUCCESS,
  payload,
});

const getDataError = () => ({
  type: GET_DATA_ERROR,
});

//getting Data;


const token = JSON.parse(localStorage.getItem("token"));

export const getProfileData = () => (dispach) => {

  const url=`${process.env.REACT_APP_SERVER}/users/profile`

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + token?.token);

  dispach(getDataRequest());
  fetch(url, {
    headers: headers,
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      dispach(getDataSuccess(res));
    })
    .catch((error) => dispach(getDataError()));
};
