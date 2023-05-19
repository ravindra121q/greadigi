import jwtDecode from "jwt-decode";

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


const token = JSON.parse(localStorage.getItem("token"));


//getting Data;

export const getAttributesData = (id) => (dispatch) => {

  const url=`${process.env.REACT_APP_SERVER}/attributes?section=` + id;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + token);

  dispatch(getDataRequest());
  fetch(url, {
    headers: headers,
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res,"adata")
      dispatch(getDataSuccess(res));
    })
    .catch((error) => dispatch(getDataError()));
};

export const getUserCreatedPresentationData = () => (dispatch) => {


  const url=`${process.env.REACT_APP_SERVER}/presentations/user`

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + token);

  // Make a fetch request with the headers
  dispatch(getDataRequest());

  fetch(url, {
    method: "GET", // or 'POST', 'PUT', etc.
    headers: headers,
    // body: JSON.stringify(obj),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log("data",data)
      dispatch(getDataSuccess(data));
    })
    .catch((error) => dispatch(getDataError()));

};


export const getSingleUserPresentationData = (id) => (dispatch) => {

  const url=`${process.env.REACT_APP_SERVER}/presentations/` + id

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + token);

  dispatch(getDataRequest());
  fetch(url,{
    method: "GET", 
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



export const getSectionData = (id) => (dispatch) => {
 
  const url=`${process.env.REACT_APP_SERVER}/sections/presentation/` + id

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + token);

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
    .catch((error) => dispatch(getDataError()));
};





export const getSinglePresentationSectionData = (payload) => (dispatch) => {



  const url=`${process.env.REACT_APP_SERVER}/sections/user/${payload.pid}`

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + token);

  dispatch(getDataRequest());
  fetch(url,{
    headers:headers,
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      dispatch(getDataSuccess(res));
    })
    .catch((error) => dispatch(getDataError()));
};


export const getPresentationTeamsData = (id) => (dispatch) => {
  dispatch(getDataRequest());
  fetch(`${process.env.REACT_APP_SERVER_13}/teams/`+id)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      dispatch(getDataSuccess(res));
    })
    .catch((error) => dispatch(getDataError()));
};