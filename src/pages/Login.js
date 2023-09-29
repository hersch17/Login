import React, {
  useEffect,
  useState,
} from "react";
import {
  useNavigate,
  //Link,
} from "react-router-dom";
//import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import {
  toast,
  ToastContainer,
} from "react-toastify";

import "../styles/login.css";
import { loginRegister } from "../api";

const toastStyle = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};
const Login = () => {
  const [currTab, setCurrTab] = useState(2);

  useState(false);
  const toggleTab = (idx) => {
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
          Event/Super Admin
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
  const navigate = useNavigate();
  //const dispatch = useDispatch();
  const [eventAdminForm, setEventAdminForm] =
    useState({
      email: "",
      password: "",
      remember: false,
    });
  function handleSubmit() {
    //formData.isRegistration = false;
    //event.preventDefault();
    loginRegister(eventAdminForm)
      .then((data) => {
        //console.log("data: ", data);
        if (data.profile.type === "participant") {
          toast.error("Not an Admin", toastStyle);
        } else {
          sessionStorage.setItem("login", true);
          toast.info("Success", toastStyle);
          navigate("/studentinfo", {
            state: {
              profile: data.profile,
              token: data.token,
            },
          });
        }
      })
      .catch((err) => {
        toast.error(err, toastStyle);
      });
  }

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
        Enter Details
      </div>
      {/* <div className="login-form-input-grp">
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
      </div> */}
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
      <button
        className="submit-btn"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <ToastContainer />
    </div>
  );
};
const GeneralAdminForm = () => {
  const [uniqueID, setUniqueID] = useState("");
  return (
    <div>
      <div className="login-form-title">
        Enter Details
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
