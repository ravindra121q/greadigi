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

export const getSectionData = (id) => (dispatch) => {
 
  const url=`${process.env.REACT_APP_SERVER}/sections/presentation/` + id

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
    .catch((error) => dispatch(getDataError()));
};


export const getSinglePresentationSectionData = (id) => (dispatch) => {
  
  const url=`${process.env.REACT_APP_SERVER}/sections/user/`+id

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + token?.token);

  dispatch(getDataRequest());
  fetch(url,{
    headers:headers,
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      // console.log(res,"data")
      dispatch(getDataSuccess(res));
    })
    .catch((error) => dispatch(getDataError()));
};
