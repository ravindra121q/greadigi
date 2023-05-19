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







//posting presentations Data;

// export const addData = (payload) => (dispatch) => {
//   const url = `http://${process.env.REACT_APP_SERVER}/presentations/save/1`;

//   // 1. Add a console log to check the payload before sending the request
//   console.log("Payload:", payload);

//   // 2. Remove the "no-cors" mode and add the credentials option
//   dispatch(addDataRequest());
//   fetch(url, {
//     method: "POST",
//     credentials: "include", // This option enables cookies to be sent across domains
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token}`,
//     },
//     body: JSON.stringify(payload.data),
//   })
//     .then((res) => {
//       // 3. Check the response status code and handle the error
//       if (res.status === 401) {
//         throw new Error("Unauthorized");
//       }
//       return res.json();
//     })
//     .then((val) => {
//       dispatch(
//         addDataSuccess({
//           status: true,
//           message: "no",
//         })
//       );
//       swal("Success!", "Presentation Added Successfully", "success", {
//         buttons: false,
//         timer: 3000,
//       });
//       payload.navigate("/manage")
//     })
//     .catch((error) => {
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


export const addData = (payload) => (dispatch) => {
  const token = JSON.parse(localStorage.getItem("token"));
  console.log(token)
  console.log("payload",payload)


  dispatch(addDataRequest());

  const url=`http://${process.env.REACT_APP_SERVER}/presentations/save`

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + token);

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
      dispatch(
        addDataSuccess({
          status: true,
          message: "Presentation Added Successfully",
        })
      );
      swal("Success!", "Presentation Added Successfully", "success", {
        buttons: false,
        timer: 3000,
      });
      payload.navigate("/manage")
    })
    .catch((error) =>{
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

