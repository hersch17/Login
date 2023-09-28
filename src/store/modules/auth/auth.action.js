import Session from "../../../Session";
export const loginReg = (data) => (dispatch) => {
  Session.setObject("profile", data);

  dispatch(
    {
      payload: data,
      type: "LOGIN_REGISTER",
    },
    () => {
      //console.log("callback");
    }
  );
};

export const events = (payload) => ({
  type: "FETCH_EVENTS",
  payload: payload,
});

export const logout = () => ({
  type: "LOGOUT",
  payload: null,
});

export const adminEvents = (payload) => ({
  type: "FETCH_ADMIN_EVENTS",
  payload: payload,
});
export const newEvent = (payload) => ({
  type: "ADD_EVENT",
  payload: payload,
});
export const newPass = (payload) => ({
  type: "ADD_PASS",
  payload: payload,
});
export const upcoming = (payload) => ({
  type: "FETCH_UPCOMING",
  payload: payload,
});
export const completed = (payload) => ({
  type: "FETCH_COMPLETED",
  payload: payload,
});
export const updates = (payload) => ({
  type: "FETCH_UPDATES",
  payload: payload,
});
export const loading = (payload) => ({
  type: "SET_LOADING",
  payload: payload,
});
export const passes = (payload) => ({
  type: "FETCH_PASSES",
  payload: payload,
});
