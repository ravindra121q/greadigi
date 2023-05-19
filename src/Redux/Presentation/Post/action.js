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

export const addData = (payload) => (dispatch) => {
  const token = JSON.parse(localStorage.getItem("token"));
  console.log(token);
  console.log("payload", payload);

  dispatch(addDataRequest());

  const url = `https://wary-flame-production.up.railway.app/presentations/save`;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + token?.token);

  // Make a fetch request with the headers
  fetch(url, {
    method: "POST", // or 'POST', 'PUT', etc.
    headers: headers,
    body: JSON.stringify(payload.data),
  })
    .then((res) => {
      if (res.status === 401) {
        throw new Error("Unauthorized");
      }
      return res.json();
    })
    .then((val) => {
      if (
        val.hasOwnProperty("status") &&
        val.status === "Presentation created successfully"
      ) {
        dispatch(
          addDataSuccess({
            status: true,
            message: "Presentation Added Successfully",
            presentation: val.presentation,
          })
        );
        swal("Success!", "Presentation Added Successfully", "success", {
          buttons: false,
          timer: 3000,
        });
        // payload.navigate("/manage")
        payload.navigate(`/manage/detail/${val.presentation.id}`);
      } else {
        throw new Error("Internal Server Error");
      }
    })
    .catch((error) => {
      console.log(error);
      if (error.message === "Unauthorized") {
        dispatch(
          addDataError({
            status: false,
            message: "Access Denied. Please login again.",
          })
        );
        swal("Error!", "Access Denied. Please login again.", "error", {
          buttons: false,
          timer: 3000,
        });
        payload.navigate("/login");
      } else {
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
      }
    });
};
