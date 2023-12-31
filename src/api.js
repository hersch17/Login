//import { loginReg } from "./store/modules/auth/auth.action";
// const url="http://localhost:8000/api";
// const url = "https://sphinx-backend.onrender.com/api";
const url =
  "https://sphinx-372511.de.r.appspot.com/api";

export const loginRegister = async (
  //dispatch,
  creds
) => {
  //console.log("Login Called");
  //console.log(creds);
  return fetch(`${url}/users`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
    },
    method: "POST",
    body: JSON.stringify(creds),
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      if (data.success) {
        // const profile = {
        //   token: data.token,
        //   profile: data.profile,
        // };
        //console.log(data.success);
        //dispatch(loginReg(profile));
        return data;
      }
      throw data;
    })
    .catch((error) => {
      throw error;
      // window.location.href = "/";
    });
};
export const fetchAdminEvents = async (token) => {
  return fetch(`${url}/events/eventadmin`, {
    headers: {
      mode: "cors",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log(data.events);
      return data.events;
    })
    .catch((err) => {
      throw err;
    });
};
export const getUserByUniqueID = async (
  uniqueID
) => {
  ////console.log("Event Fetched");
  return fetch(`${url}/users/scan`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
    },
    method: "POST",
    body: JSON.stringify(uniqueID),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        //console.log(data);
        return data;
      }
      throw data;
    })
    .catch((err) => {
      throw err;
    });
};
export const getAttendanceStatus = (body) => {
  return fetch(`${url}/events/attend`, {
    headers: {
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      throw err;
    });
};
export const markAttendance = (body) => {
  return fetch(`${url}/events/attend`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
    },
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        return data;
      }
      throw data;
    })
    .catch((err) => {
      throw err;
    });
};
