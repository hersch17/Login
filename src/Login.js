import React, { useState } from "react";
import "./styles/login.css";
const Login = () => {
  const [currTab, setCurrTab] = useState(1);
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
  return (
    <div>
      <div className="login-form-title">
        Add Details
      </div>
      <div className="login-form-input-grp">
        <label className="login-form-text-label">
          ID *
        </label>
        <input
          className="login-form-text-inputs"
          name="name"
          autoFocus
          type="text"
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
        />
      </div>
    </div>
  );
};
const GeneralAdminForm = () => {
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
          autoFocus
          type="text"
        />
      </div>
    </div>
  );
};

export default Login;
