import { useSelector, useDispatch } from "react-redux";

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

const token = JSON.parse(localStorage.getItem("token"));

//getting data
export const getData = () => (dispatch, getState) => {
  const token =
    getState().token.TOKEN || localStorage.getItem(JSON.stringify("token"));
  console.log(token, "new token");
  const url = `https://wary-flame-production.up.railway.app/sections/user`;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + token?.token);

  dispatch(getDataRequest());
  fetch(url, {
    headers: headers,
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      dispatch(getDataSuccess(res));
    })
    .catch((error) => dispatch(getDataError()));
};

export const userData = (student) => (dispatch, getState) => {
  const token =
    getState().token.TOKEN == {}
      ? localStorage.getItem(JSON.stringify("token"))
      : getState().token.TOKEN || localStorage.getItem(JSON.stringify("token"));
  console.log(token);
  // console.log(student, "Student id");
  const url = `https://wary-flame-production.up.railway.app/users/presentations?student=${student}`;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + token?.token);

  dispatch(getDataRequest());
  fetch(url, {
    headers: headers,
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      dispatch(getDataSuccess(res));
    })
    .catch((error) => dispatch(getDataError()));
};

export const getUserCreatedPresentationData =
  (page) => (dispatch, getState) => {
    const token =
      getState().token.TOKEN || localStorage.getItem(JSON.stringify("token"));
    console.log(token, "user");
    const url = `https://wary-flame-production.up.railway.app/presentations/user?page=${page}&size=10`;

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token?.token);

    dispatch(getDataRequest());

    fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("data", data);
        dispatch(getDataSuccess(data));
      })
      .catch((error) => dispatch(getDataError()));
  };

export const getSingleUserPresentationData = (id) => (dispatch, getState) => {
  const token =
    getState().token.TOKEN || localStorage.getItem(JSON.stringify("token"));
  console.log("id at line 103", id);
  const url =
    `https://wary-flame-production.up.railway.app/presentations/` + id;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + token?.token);

  dispatch(getDataRequest());
  fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      dispatch(getDataSuccess(res));
    })
    .catch((error) => {
      dispatch(getDataError());
      console.log(error);
    });
};

export const getPresentationTeamsData = (id) => (dispatch, getState) => {
  const token =
    getState().token.TOKEN || localStorage.getItem(JSON.stringify("token"));
  dispatch(getDataRequest());
  fetch(`https://wary-flame-production.up.railway.app/teams/` + id)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      dispatch(getDataSuccess(res));
    })
    .catch((error) => dispatch(getDataError()));
};

export const getResultData = (id) => (dispatch, getState) => {
  const token =
    getState().token.TOKEN || localStorage.getItem(JSON.stringify("token"));
  const url = `https://wary-flame-production.up.railway.app/results/` + id;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + token?.token);

  dispatch(getDataRequest());
  fetch(url, {
    headers: headers,
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      dispatch(getDataSuccess(res));
    })
    .catch((error) => {
      console.log(error);
      dispatch(getDataError());
    });
};
