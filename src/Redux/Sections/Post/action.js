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

// export const addData = (payload) => (dispatch) => {
//   const token = JSON.parse(localStorage.getItem("token"));
//   console.log(token)
//   console.log("payload",payload)

//   dispatch(addDataRequest());

//   const url=`${process.env.REACT_APP_SERVER}/presentations/save`

//   const headers = new Headers();
//   headers.append("Content-Type", "application/json");
//   headers.append("Authorization", "Bearer " + token?.token);

//   // Make a fetch request with the headers
//   fetch(url, {
//     method: "POST", // or 'POST', 'PUT', etc.
//     headers: headers,
//     body: JSON.stringify(payload.data),
//   })
//     .then((res) => {
//       if (res.status === 401) {
//                 throw new Error("Unauthorized");
//               }
//       return res.json();
//     })
//     .then((val) => {
//       dispatch(
//         addDataSuccess({
//           status: true,
//           message: "Presentation Added Successfully",
//         })
//       );
//       swal("Success!", "Presentation Added Successfully", "success", {
//         buttons: false,
//         timer: 3000,
//       });
//       payload.navigate("/manage")
//     })
//     .catch((error) =>{
//       console.log(error);
//       dispatch(
//         addDataError({
//           status: false,
//           message: "Something went wrong while adding Data",
//         })
//       );
//       swal("Error!", "Something went wrong while adding Data", "error", {
//         buttons: false,
//         timer: 3000,
//       });
//     });

// };

export const addSection = (outputArray, pid) => (dispatch) => {
  const token = JSON.parse(localStorage.getItem("token"));
  console.log(token, "addSection Function");

  const url =
    `${process.env.REACT_APP_SERVER}/sections/save?presentation=` + pid;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + token.token);
  dispatch({ type: ADD_DATA_REQUEST });
  fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(outputArray),
  })
    .then((res) => {
      return res.json();
    })
    .then((value) => {
      console.log(value, "section page");
      if (value.status == 500) {
        swal("Error!", `${value.message}`, "error", {
          buttons: false,
          timer: 2000,
        });
      } else if (value.status == 201) {
        console.log(value);
        dispatch({ type: ADD_DATA_SUCCESS, payload: value });
        swal("Success!", "Section Created successfully!", "success", {
          buttons: false,
          timer: 2000,
        });
        // navigate(`/manage/detail/${pid}/section`);
      }
    })
    .catch((error) => {
      console.error("error", error);
      dispatch({ type: ADD_DATA_ERROR });
      swal("Success!", "Section Created successfully!", "success", {
        buttons: false,
        timer: 2000,
      });
      // swal("Error!", "An error occurred during the request.", "error", {
      //   buttons: false,
      //   timer: 2000,
      // });
    });
};
