import axios from "axios";

export const headers = () => {
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));

  if (!localStorage.getItem("loggedin")) {
    return {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
      // "X-Frame-Options": "SAMEORIGIN",
    };
  } else {
    //alert(LocalStorageData.token);
    return {
      Authorization: "Bearer " + LocalStorageData.token,
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
      // "X-Frame-Options": "SAMEORIGIN",
    };
  }
};

const instance = axios.create({
  baseURL: "https://localhost:7170",

  //headers: headers("Access-Control-Allow-Origin: *"),
  // headers: headers("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS"),
  // headers: headers("Access-Control-Allow-Headers", "Content-Type"),
  //mode: "no-cors", // 'cors' by default
  // timeout: 10000,
  params: {}, // do not remove this, its added to add params later in the config
});

instance.interceptors.request.use(
  function (config) {
    //alert("test");
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(undefined, (err) => {
  //const history = useHistory();

  // const error = ;
  //if error is 401
  if (err.response !== undefined) {
    if (err.response.status === 401) {
      localStorage.clear();
      //alert("Session Out");
      window.location.reload();
    }
  }

  //console.log("errwew", err.response);
});

export default instance;

//export const staticToken =
//  "eyJhb5cCI6IkpXVCJ9.eyJzdWIiOiJEZXB0IiwiZW1hRhaHViLmVtcDA5QGdtYWlsLmNvbSIsImp0aSI6ImgzMy05MDAwLTE0ObG9jYWxob3N0IiwiYXVkIjoibG9jYWxob3N0In0AsqYeezwXWqsL6WLZulQ9bwI";
export const baseURL = "https://localhost:7170";

