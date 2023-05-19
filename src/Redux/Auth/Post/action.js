import swal from "sweetalert";
//action types
export const ADD_DATA_REQUEST = "ADD_DATA_REQUEST";
export const ADD_DATA_SUCCESS = "ADD_DATA_SUCCESS";
export const ADD_DATA_ERROR = "ADD_DATA_ERROR";

//actions
const addDataRequest = () => ({
  type: ADD_DATA_REQUEST,
});

const addDataSuccess = (payload) => ({
  type: ADD_DATA_SUCCESS,
  payload,
});

const addDataError = (payload) => ({
  type: ADD_DATA_ERROR,
  payload,
});

//posting Data;

export const addUserData = (payload) => (dispatch) => {
  console.log("userData",payload)

  const url = `https://wary-flame-production.up.railway.app/users/save`;

  dispatch(addDataRequest());

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload.data),
  })
    .then((res) => {
      return res.text();
    })
    .then((val) => {
      console.log(val);
      dispatch(
        addDataSuccess({
          status: true,
          message: "User Added Successfully",
        })
      );
      swal("Success!", "User Added Successfully", "success", {
        buttons: false,
        timer: 3000,
      });
      payload.navigate("/login")
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        addDataError({
          status: false,
          message: "Something went wrong while adding Data",
        })
      );
      swal("Error!", "Something went wrong while adding Data", "error", {
        buttons: false,
        timer: 3000,
      });
    });
};
