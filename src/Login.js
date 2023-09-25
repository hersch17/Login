import React, { useState } from "react";
import "./styles/login.css";
const Login = () => {
  const [currTab, setCurrTab] = useState();
  const toggleTab = (idx) => {
    console.log("from ", idx);
    setCurrTab(idx);
  };
  return (
    <div className="container">
      <div className="bloc-tabs">
        <div
          className={
            currTab === 1
              ? "tabs active-tab"
              : "tabs"
          }
          onClick={() => toggleTab(1)}
        >
          General Admin
        </div>
        <div
          className={
            currTab === 2
              ? "tabs active-tab"
              : "tabs"
          }
          onClick={() => toggleTab(2)}
        >
          Event Admin
        </div>
      </div>
      <div className="form-tabs">
        <div
          className={
            currTab === 1
              ? "form active-form"
              : "form"
          }
        >
          <GeneralAdminForm />
        </div>
        <div
          className={
            currTab === 2
              ? "form active-form"
              : "form"
          }
        >
          <EventAdminForm />
        </div>
      </div>
    </div>
  );
};

const EventAdminForm = () => {
  const [eventAdminForm, setEventAdminForm] =
    useState({
      id: "",
      email: "",
      password: "",
      mobile: "",
    });
  function onChange(event) {
    const { name, value } = event.target;
    setEventAdminForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  return (
    <div className="event-admin-form">
      <div className="login-form-title">
        Add Details
      </div>
      <div className="login-form-input-grp">
        <label className="login-form-text-label">
          ID *
        </label>
        <input
          className="login-form-text-inputs"
          name="id"
          autoFocus
          type="text"
          value={eventAdminForm.id}
          onChange={(e) => onChange(e)}
        />
      </div>
      <div className="login-form-input-grp">
        <label className="login-form-text-label">
          Email *
        </label>
        <input
          className="login-form-text-inputs"
          name="email"
          type="email"
          value={eventAdminForm.email}
          onChange={(e) => onChange(e)}
        />
      </div>
      <div className="login-form-input-grp">
        <label className="login-form-text-label">
          Password *
        </label>
        <input
          className="login-form-text-inputs"
          name="password"
          type="password"
          value={eventAdminForm.password}
          onChange={(e) => onChange(e)}
        />
      </div>
      <button className="submit-btn">
        Submit
      </button>
    </div>
  );
};
const GeneralAdminForm = () => {
  const [uniqueID, setUniqueID] = useState("");
  return (
    <div>
      <div className="login-form-title">
        Add Details
      </div>
      <div className="login-form-input-grp">
        <label className="login-form-text-label">
          Unique ID *
        </label>
        <input
          className="login-form-text-inputs"
          name="uniqueid"
          value={uniqueID}
          onChange={(event) =>
            setUniqueID(event.value)
          }
          autoFocus
          type="text"
        />
      </div>
      <button className="submit-btn">
        Submit
      </button>
    </div>
  );
};

export default Login;
